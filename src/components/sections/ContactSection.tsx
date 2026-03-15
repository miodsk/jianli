"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MessageCircle, MapPin, Github } from "lucide-react";
import resumeData from "@/data/resume.json";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">联系方式</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            欢迎与我联系，期待与您合作
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.label}
                      variants={itemVariants}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
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
              </div>

              <Separator className="my-8" />

              <motion.div
                variants={itemVariants}
                className="text-center space-y-4"
              >
                <p className="text-muted-foreground">
                  您也可以通过以下方式找到我
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href="https://github.com/miodsk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button size="lg" asChild>
                    <a href={`mailto:${personal.email}`}>
                      <Mail className="w-5 h-5 mr-2" />
                      发送邮件
                    </a>
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
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
