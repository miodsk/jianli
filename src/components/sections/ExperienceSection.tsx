"use client";

import { Building2, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardHover, cardStagger, cardTap, sideReveal } from "@/lib/animations";
import resumeData from "@/data/resume.json";

export function ExperienceSection() {
  const { experience } = resumeData;

  return (
    <section id="experience" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="工作经历"
          description="我的专业工作经验和成就"
        />

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="space-y-4"
        >
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              variants={sideReveal}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm transition-colors hover:border-primary/15 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Building2 className="w-6 h-6 text-primary" />
                      {exp.company}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.startDate} - {exp.endDate}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground font-medium mt-1">
                    {exp.position}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
