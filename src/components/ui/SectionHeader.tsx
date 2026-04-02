"use client";

import { motion } from "motion/react";
import { sectionCopyReveal, sectionHeadingReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-8", className)}>
      <motion.h2
        variants={sectionHeadingReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="text-2xl font-bold md:text-3xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={sectionCopyReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="mx-auto mt-2 max-w-2xl text-muted-foreground"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
