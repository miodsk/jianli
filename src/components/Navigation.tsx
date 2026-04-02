"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X } from "lucide-react";
import {
  buttonHover,
  buttonTap,
  defaultTransition,
  emphasizedEase,
  navIndicatorTransition,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { id: "hero", label: "首页" },
  { id: "skills", label: "技能" },
  { id: "education", label: "教育" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "联系" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const mobileMenuId = "mobile-navigation-menu";
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 120 : 200,
    damping: shouldReduceMotion ? 28 : 32,
    mass: 0.22,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: emphasizedEase }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border/70 bg-background/88 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
          <motion.span
            className="block h-full origin-left bg-gradient-to-r from-primary/20 via-primary/80 to-primary/20"
            style={{ scaleX: progressScaleX }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-foreground"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              孙燚峰
            </motion.button>

            {/* Desktop Menu */}
            <LayoutGroup id="navigation-desktop-menu">
              <div className="hidden items-center gap-2 md:flex">
                <div className="flex items-center gap-1 rounded-full border border-border/70 bg-background/75 p-1 shadow-sm backdrop-blur-xl">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        whileHover={buttonHover}
                        whileTap={buttonTap}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="navigation-active-pill"
                            className="absolute inset-0 rounded-full border border-primary/10 bg-primary/10"
                            transition={navIndicatorTransition}
                          />
                        ) : null}
                        <span className="relative z-10">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <div className="border-l border-border/70 pl-3">
                  <ThemeToggle />
                </div>
              </div>
            </LayoutGroup>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle />
              <motion.button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full border border-border/70 bg-background/80 p-2 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls={mobileMenuId}
                whileTap={buttonTap}
                whileHover={buttonHover}
              >
                <motion.span
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={shouldReduceMotion ? false : { opacity: 0, rotate: -18, scale: 0.92 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={defaultTransition}
                  className="flex"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence initial={false}>
        {isMobileMenuOpen ? (
          <motion.div
            id={mobileMenuId}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: emphasizedEase }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border/70 bg-background/95 shadow-lg backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    whileTap={buttonTap}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
