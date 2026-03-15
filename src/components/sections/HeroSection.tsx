"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Globe, Calendar, Briefcase } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import resumeData from "@/data/resume.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export function HeroSection() {
  const { personal } = resumeData;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="py-20 md:py-28 flex items-center justify-center px-4 pt-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Avatar */}
        <motion.div variants={itemVariants} className="mb-5">
          <Avatar className="w-28 h-28 mx-auto border-4 border-primary/20 shadow-xl">
            <AvatarImage src="/avatar.jpg" alt={personal.name} />
            <AvatarFallback className="text-3xl font-bold bg-primary/10">
              {personal.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Name & Title */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold mb-2"
        >
          {personal.name}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-4"
        >
          {personal.title}
        </motion.p>

        {/* Status Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-5"
        >
          <Badge variant="secondary" className="text-sm px-3 py-1">
            <Briefcase className="w-3 h-3 mr-1" />
            {personal.status}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Calendar className="w-3 h-3 mr-1" />
            {personal.availability}
          </Badge>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-6"
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {personal.location}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {personal.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {personal.phone}
          </span>
          {personal.website && (
            <a
              href={`https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              {personal.website}
            </a>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button size="lg" onClick={scrollToContact}>
            联系我
          </Button>
          <Button size="lg" variant="outline" onClick={scrollToProjects}>
            查看项目
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
