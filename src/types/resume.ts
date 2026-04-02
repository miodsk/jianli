export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  wechat?: string;
  location: string;
  website: string;
  birthDate?: string;
  status?: string;
  availability?: string;
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  gpa: number;
  startDate: string;
  endDate: string;
}

export interface SkillItem {
  name: string;
  proficiency?: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  title?: string;
  description?: string;
  techStack?: string[];
  github?: string;
  demo?: string;
}

export interface Resume {
  personal: PersonalInfo;
  education: Education[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}
