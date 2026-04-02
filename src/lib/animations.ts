import type { TargetAndTransition, Transition, Variants } from "motion/react";

type RevealAxis = "x" | "y";

interface RevealOptions {
  axis?: RevealAxis;
  distance?: number;
  duration?: number;
}

interface StaggerOptions {
  staggerChildren?: number;
  delayChildren?: number;
}

export const motionEase = [0.22, 1, 0.36, 1] as const;
export const emphasizedEase = [0.16, 1, 0.3, 1] as const;

export const motionDurations = {
  fast: 0.18,
  normal: 0.32,
  medium: 0.42,
  slow: 0.6,
  ambient: 9,
} as const;

export const defaultTransition: Transition = {
  duration: motionDurations.normal,
  ease: motionEase,
};

export const emphasisTransition: Transition = {
  duration: motionDurations.medium,
  ease: emphasizedEase,
};

export const liftSpringTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 22,
  mass: 0.9,
};

export const navIndicatorTransition: Transition = {
  type: "spring",
  stiffness: 360,
  damping: 30,
  mass: 0.75,
};

export function createRevealVariants({
  axis = "y",
  distance = 20,
  duration = motionDurations.medium,
}: RevealOptions = {}): Variants {
  const hiddenOffset = axis === "x" ? { x: distance } : { y: distance };
  const visibleOffset = axis === "x" ? { x: 0 } : { y: 0 };

  return {
    hidden: {
      opacity: 0,
      ...hiddenOffset,
    },
    visible: {
      opacity: 1,
      ...visibleOffset,
      transition: {
        duration,
        ease: motionEase,
      },
    },
  };
}

export function createStaggerContainer({
  staggerChildren = 0.08,
  delayChildren = 0,
}: StaggerOptions = {}): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
}

export const fadeIn = createRevealVariants({ distance: 0, duration: 0.24 });
export const fadeInUp = createRevealVariants({ axis: "y", distance: 20 });
export const fadeInDown = createRevealVariants({ axis: "y", distance: -20 });
export const fadeInLeft = createRevealVariants({ axis: "x", distance: -20 });
export const fadeInRight = createRevealVariants({ axis: "x", distance: 20 });
export const slideUp = createRevealVariants({ axis: "y", distance: 40 });
export const slideDown = createRevealVariants({ axis: "y", distance: -40 });

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: emphasisTransition,
  },
};

export const sectionStagger = createStaggerContainer({
  staggerChildren: 0.1,
  delayChildren: 0.08,
});

export const cardStagger = createStaggerContainer({
  staggerChildren: 0.12,
});

export const badgeStagger = createStaggerContainer({
  staggerChildren: 0.04,
  delayChildren: 0.04,
});

export const staggerContainer = sectionStagger;
export const staggerFast = createStaggerContainer({ staggerChildren: 0.05 });
export const staggerSlow = createStaggerContainer({ staggerChildren: 0.16 });

export const sectionReveal = createRevealVariants({ axis: "y", distance: 24 });
export const sectionHeadingReveal = createRevealVariants({ axis: "y", distance: 18 });
export const sectionCopyReveal = createRevealVariants({ axis: "y", distance: 14, duration: motionDurations.normal });
export const cardReveal = createRevealVariants({ axis: "y", distance: 22 });
export const sideReveal = createRevealVariants({ axis: "x", distance: 24 });
export const badgeReveal = createRevealVariants({ axis: "y", distance: 10, duration: 0.28 });

export const cardHover = {
  y: -6,
  scale: 1.01,
  transition: liftSpringTransition,
};

export const cardTap = {
  scale: 0.99,
  transition: defaultTransition,
};

export const buttonHover = {
  y: -2,
  scale: 1.01,
  transition: liftSpringTransition,
};

export const buttonTap = {
  y: 0,
  scale: 0.98,
  transition: defaultTransition,
};

export const animationConfig = {
  fast: { duration: motionDurations.fast },
  normal: { duration: motionDurations.normal },
  slow: { duration: motionDurations.slow },
  spring: liftSpringTransition,
  ease: { ease: motionEase },
};

export function createFloatingAnimation(
  reduceMotion: boolean,
  distance = 10,
  duration: number = motionDurations.ambient
): TargetAndTransition {
  if (reduceMotion) {
    return { y: 0 };
  }

  return {
    y: [0, -distance, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    },
  };
}

export function createAmbientDrift(
  reduceMotion: boolean,
  xOffset = 18,
  yOffset = 12,
  duration: number = motionDurations.ambient + 2
): TargetAndTransition {
  if (reduceMotion) {
    return { opacity: 0.8 };
  }

  return {
    x: [0, xOffset, 0],
    y: [0, -yOffset, 0],
    opacity: [0.72, 0.92, 0.72],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    },
  };
}
