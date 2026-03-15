"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import resumeData from "@/data/resume.json";
import {
  Code2,
  Server,
  Database,
  Languages,
  Brain,
  LucideIcon,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Language: Languages,
  LLM: Brain,
};

const categoryLabels: Record<string, string> = {
  Frontend: "前端框架",
  Backend: "后端框架",
  Database: "数据存储",
  Language: "编程语言",
  LLM: "AI/LLM",
};

const proficiencyColors: Record<string, string> = {
  熟悉: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  了解: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  精通: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function SkillsSection() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">技术技能</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我的技术栈覆盖前端、后端和数据库，专注于构建完整的 Web 应用
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skills.map((skillGroup) => {
            const Icon = categoryIcons[skillGroup.category] || Code2;
            const label = categoryLabels[skillGroup.category] || skillGroup.category;

            return (
              <motion.div key={skillGroup.category} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="w-5 h-5 text-primary" />
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="outline"
                          className={`${
                            proficiencyColors[skill.proficiency] || ""
                          } px-3 py-1`}
                        >
                          {skill.name}
                          <span className="ml-1 text-xs opacity-70">
                            ({skill.proficiency})
                          </span>
                        </Badge>
                      ))}
                    </div>
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
