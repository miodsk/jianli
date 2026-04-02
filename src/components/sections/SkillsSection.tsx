"use client";

import { Bot, Brain, Code2, Database, Languages, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  badgeReveal,
  badgeStagger,
  cardHover,
  cardReveal,
  cardStagger,
  cardTap,
} from "@/lib/animations";
import resumeData from "@/data/resume.json";

const categoryIcons: Record<string, LucideIcon> = {
  开发语言: Languages,
  Web框架: Code2,
  LLM框架: Brain,
  中间件: Database,
  AI编程工具: Bot,
};

export function SkillsSection() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="技术技能"
          description="我的技术栈覆盖前端、后端、AI 工作流与基础设施，专注于构建完整的 Web 应用"
        />

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skillGroup) => {
            const Icon = categoryIcons[skillGroup.category] || Code2;

            return (
              <motion.div
                key={skillGroup.category}
                variants={cardReveal}
                whileHover={cardHover}
                whileTap={cardTap}
              >
                <Card className="h-full border-border/70 bg-card/90 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/20 hover:shadow-xl">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="w-5 h-5 text-primary" />
                      {skillGroup.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <motion.div
                      variants={badgeStagger}
                      className="flex flex-wrap gap-2"
                    >
                      {skillGroup.items.map((skill) => (
                        <motion.span
                          key={skill.name}
                          variants={badgeReveal}
                          className="inline-flex"
                        >
                          <Badge variant="outline" className="px-3 py-1 shadow-sm">
                            {skill.name}
                          </Badge>
                        </motion.span>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
