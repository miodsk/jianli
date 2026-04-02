"use client";

import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardHover, cardTap, sideReveal } from "@/lib/animations";
import resumeData from "@/data/resume.json";

export function EducationSection() {
  const { education } = resumeData;

  return (
    <section id="education" className="py-12 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="教育背景" />

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={sideReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={cardHover}
              whileTap={cardTap}
            >
              <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm transition-colors hover:border-primary/15 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      {edu.school}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      <Calendar className="w-3 h-3 mr-1" />
                      {edu.startDate} - {edu.endDate}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {edu.major}
                    </span>
                    <Badge variant="secondary">{edu.degree}</Badge>
                    {edu.gpa && (
                      <span className="text-sm">
                        GPA: <Badge variant="secondary">{edu.gpa}</Badge>
                      </span>
                    )}

                    {edu.rank && (
                      <span className="text-sm">
                        Rank: <Badge variant="secondary">{edu.rank}</Badge>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
