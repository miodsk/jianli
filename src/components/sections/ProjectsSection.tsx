"use client";

import { ExternalLink, Folder, Github } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  badgeReveal,
  badgeStagger,
  buttonTap,
  cardHover,
  cardReveal,
  cardStagger,
  cardTap,
  sectionReveal,
  sectionStagger,
} from "@/lib/animations";
import resumeData from "@/data/resume.json";

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
        <SectionHeader
          title="项目经历"
          description="我参与开发的主要项目和作品"
        />

        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {validProjects.map((project, index) => (
            <motion.article
              key={index}
              variants={cardReveal}
              whileHover={cardHover}
              whileTap={cardTap}
              className="h-full"
            >
              <Card className="group relative flex h-full flex-col overflow-hidden border-border/70 bg-card/95 shadow-sm transition-colors hover:border-primary/20 hover:shadow-2xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <motion.div variants={sectionStagger} className="flex h-full flex-col">
                  <CardHeader className="pb-2">
                    <motion.div variants={badgeReveal}>
                      <Folder className="h-8 w-8 text-primary/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </motion.div>
                    <motion.div variants={sectionReveal}>
                      <CardTitle className="mt-2 text-lg">{project.title}</CardTitle>
                    </motion.div>
                    <motion.div variants={sectionReveal}>
                      <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-end gap-4">
                    <motion.div
                      variants={badgeStagger}
                      className="flex flex-wrap gap-2"
                    >
                      {project.techStack?.map((tech) => (
                        <motion.span
                          key={tech}
                          variants={badgeReveal}
                          className="inline-flex"
                        >
                          <Badge variant="secondary" className="text-xs shadow-sm">
                            {tech}
                          </Badge>
                        </motion.span>
                      ))}
                    </motion.div>
                    <motion.div variants={badgeStagger} className="flex flex-wrap gap-3 text-sm">
                      {project.github ? (
                        <motion.a
                          variants={badgeReveal}
                          href={ensureHttp(project.github)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                          whileHover={{ x: 2 }}
                          whileTap={buttonTap}
                        >
                          <Github className="h-4 w-4" />
                          <span>GitHub</span>
                        </motion.a>
                      ) : null}
                      {project.demo
                        ? parseDemoList(project.demo).map((url, idx, demoUrls) => (
                            <motion.a
                              key={`${url}-${idx}`}
                              variants={badgeReveal}
                              href={ensureHttp(url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                              whileHover={{ x: 2 }}
                              whileTap={buttonTap}
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>Demo{demoUrls.length > 1 ? ` ${idx + 1}` : ""}</span>
                            </motion.a>
                          ))
                        : null}
                    </motion.div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
