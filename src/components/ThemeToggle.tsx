"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { defaultTransition, navIndicatorTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const iconKey = mounted ? (isDark ? "moon" : "sun") : "placeholder";
  const iconMotion = { opacity: 1, rotate: 0, scale: 1 };
  const iconInitial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, rotate: -70, scale: 0.75 };
  const iconExit = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, rotate: 70, scale: 0.75 };

  return (
    <motion.button
      type="button"
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
      onClick={toggleTheme}
      aria-label={isDark ? "切换到浅色主题" : "切换到深色主题"}
      data-testid="theme-toggle"
      whileTap={shouldReduceMotion ? { scale: 0.98 } : { scale: 0.94, rotate: -8 }}
    >
      <motion.span
        layout
        className={cn(
          "absolute inset-1 rounded-full",
          isDark ? "bg-primary/10" : "bg-primary/5"
        )}
        transition={navIndicatorTransition}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={iconKey}
          initial={iconInitial}
          animate={iconMotion}
          exit={iconExit}
          transition={defaultTransition}
          className="relative z-10 flex"
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
