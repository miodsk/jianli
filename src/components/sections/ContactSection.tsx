"use client";

import { Github, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  badgeReveal,
  badgeStagger,
  buttonHover,
  buttonTap,
  cardHover,
  cardTap,
  defaultTransition,
  sectionCopyReveal,
  sectionReveal,
  sectionStagger,
} from "@/lib/animations";
import resumeData from "@/data/resume.json";

export function ContactSection() {
  const { personal } = resumeData;

  const contactMethods = [
    {
      icon: Mail,
      label: "邮箱",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Phone,
      label: "电话",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: MessageCircle,
      label: "微信",
      value: personal.wechat,
      href: null,
    },
    {
      icon: MapPin,
      label: "位置",
      value: personal.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="联系方式"
          description="欢迎与我联系，期待与您合作"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionStagger}
        >
          <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm">
            <CardContent className="p-8">
              <motion.div
                variants={badgeStagger}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      variants={badgeReveal}
                      whileHover={cardHover}
                      whileTap={cardTap}
                      className="flex items-center gap-4 rounded-2xl border border-transparent bg-muted/50 p-4 transition-colors hover:border-primary/10 hover:bg-muted"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">
                          {method.label}
                        </p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="font-medium hover:text-primary transition-colors truncate block"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="font-medium truncate">{method.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <Separator className="my-8" />

              <motion.div
                variants={sectionReveal}
                className="space-y-4 text-center"
              >
                <motion.p variants={sectionCopyReveal} className="text-muted-foreground">
                  您也可以通过以下方式找到我
                </motion.p>
                <motion.div
                  variants={badgeStagger}
                  className="flex justify-center gap-4"
                >
                  <motion.div variants={badgeReveal} whileHover={buttonHover} whileTap={buttonTap}>
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href="https://github.com/miodsk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-5 w-5" />
                        GitHub
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div variants={badgeReveal} whileHover={buttonHover} whileTap={buttonTap}>
                    <Button size="lg" asChild className="shadow-lg shadow-primary/15">
                      <a href={`mailto:${personal.email}`}>
                        <Mail className="mr-2 h-5 w-5" />
                        发送邮件
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={sectionCopyReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...defaultTransition, delay: 0.16 }}
          className="mt-16 text-center text-sm text-muted-foreground"
        >
          <p>
            {new Date().getFullYear()} {personal.name}. 保留所有权利。
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
