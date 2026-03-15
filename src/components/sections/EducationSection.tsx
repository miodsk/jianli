"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, BookOpen } from "lucide-react";
import resumeData from "@/data/resume.json";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function EducationSection() {
  const { education } = resumeData;

  return (
    <section id="education" className="py-12 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">教育背景</h2>

        </motion.div>

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
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
