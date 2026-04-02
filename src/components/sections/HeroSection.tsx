"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Briefcase, Calendar, Globe, Mail, MapPin, Phone } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  badgeReveal,
  badgeStagger,
  buttonHover,
  buttonTap,
  createAmbientDrift,
  createFloatingAnimation,
  scaleIn,
  sectionReveal,
  sectionStagger,
} from "@/lib/animations";
import resumeData from "@/data/resume.json";

export function HeroSection() {
  const { personal } = resumeData;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const atmosphereY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 24]);
  const accentY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -18]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden px-4 pt-24 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 md:h-80 md:w-80"
          style={{ y: atmosphereY }}
        >
          <motion.div
            className="h-full w-full rounded-full bg-primary/10 blur-3xl"
            animate={createAmbientDrift(shouldReduceMotion, 16, 12, 12)}
          />
        </motion.div>
        <motion.div
          className="absolute right-[-4rem] top-24 h-48 w-48 md:h-64 md:w-64"
          style={{ y: accentY }}
        >
          <motion.div
            className="h-full w-full rounded-full bg-primary/8 blur-3xl"
            animate={createAmbientDrift(shouldReduceMotion, -14, 10, 15)}
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </div>

      <motion.div
        variants={sectionStagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        {/* Avatar */}
        <motion.div variants={scaleIn} className="mb-6">
          <motion.div
            animate={createFloatingAnimation(shouldReduceMotion, 8, 7.2)}
            className="mx-auto w-fit"
          >
            <div className="rounded-full bg-gradient-to-b from-primary/25 via-border/70 to-transparent p-[1px] shadow-[0_22px_60px_-34px_rgba(10,10,10,0.45)]">
              <Avatar className="mx-auto h-28 w-28 border-4 border-background/80 bg-card shadow-xl">
                <AvatarImage src="/avatar.jpg" alt={personal.name} />
                <AvatarFallback className="bg-primary/10 text-3xl font-bold">
                  {personal.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </motion.div>

        {/* Name & Title */}
        <motion.h1
          variants={sectionReveal}
          className="mb-3 text-3xl font-bold tracking-tight md:text-5xl"
        >
          {personal.name}
        </motion.h1>
        <motion.p
          variants={sectionReveal}
          className="mx-auto mb-5 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          {personal.title}
        </motion.p>

        {/* Status Badges */}
        <motion.div
          variants={badgeStagger}
          className="mb-5 flex flex-wrap justify-center gap-2"
        >
          <motion.span variants={badgeReveal} className="inline-flex">
            <Badge variant="secondary" className="px-3 py-1 text-sm shadow-sm">
              <Briefcase className="mr-1 h-3 w-3" />
              {personal.status}
            </Badge>
          </motion.span>
          <motion.span variants={badgeReveal} className="inline-flex">
            <Badge variant="outline" className="px-3 py-1 text-sm shadow-sm">
              <Calendar className="mr-1 h-3 w-3" />
              {personal.availability}
            </Badge>
          </motion.span>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={badgeStagger}
          className="mb-7 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"
        >
          <motion.span variants={badgeReveal} className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {personal.location}
          </motion.span>
          <motion.span variants={badgeReveal} className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {personal.email}
          </motion.span>
          <motion.span variants={badgeReveal} className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {personal.phone}
          </motion.span>
          {personal.website && (
            <motion.a
              variants={badgeReveal}
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <Globe className="h-4 w-4" />
              {personal.website}
            </motion.a>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={sectionReveal}
          className="flex flex-wrap justify-center gap-3"
        >
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Button size="lg" onClick={scrollToContact} className="px-7 shadow-lg shadow-primary/15">
              联系我
            </Button>
          </motion.div>
          <motion.div whileHover={buttonHover} whileTap={buttonTap}>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProjects}
              className="border-border/80 bg-background/75 px-7 shadow-sm backdrop-blur"
            >
              查看项目
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
