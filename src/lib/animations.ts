import type { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const slideUp: Variants = {
  hidden: { y: 40 },
  visible: { y: 0 },
};

export const slideDown: Variants = {
  hidden: { y: -40 },
  visible: { y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const animationConfig = {
  fast: {
    duration: 0.2,
  },
  normal: {
    duration: 0.3,
  },
  slow: {
    duration: 0.5,
  },
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  },
  ease: {
    ease: [0.25, 0.1, 0.25, 1],
  },
};

export const defaultTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};
