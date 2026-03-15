"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Folder } from "lucide-react";
import resumeData from "@/data/resume.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const ensureHttp = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `http://${url}`;
};

const parseDemoList = (demo: string | string[]): string[] => {
  if (!demo) return [];
  if (Array.isArray(demo)) return demo.filter(Boolean);
  if (demo.includes(",") || demo.includes("，")) {
    return demo.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
  }
  return [demo];
};

export function ProjectsSection() {
  const { projects } = resumeData;

  // 过滤掉空项目
  const validProjects = projects.filter(
    (project) => project.title && project.description
  );

  return (
    <section id="projects" className="py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">项目经历</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我参与开发的主要项目和作品
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {validProjects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-2">
                  <Folder className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                  <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    {project.github && (
                      <a
                        href={ensureHttp(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.demo && (() => {
                      const demoUrls = parseDemoList(project.demo as string);
                      return demoUrls.map((url, idx) => (
                        <a
                          key={idx}
                          href={ensureHttp(url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Demo{demoUrls.length > 1 ? ` ${idx + 1}` : ""}</span>
                        </a>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
