import { useInView, type UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';

export interface UseScrollAnimationOptions extends Omit<UseInViewOptions, 'once'> {
  once?: boolean;
}

export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
}

/**
 * Hook for scroll-triggered animations using framer-motion's useInView
 * 
 * @param options - Configuration options for the scroll animation
 * @returns Object containing ref and isInView state
 * 
 * @example
 * const { ref, isInView } = useScrollAnimation({ once: true, margin: "-100px" });
 * 
 * return (
 *   <motion.div
 *     ref={ref}
 *     initial={{ opacity: 0 }}
 *     animate={isInView ? { opacity: 1 } : { opacity: 0 }}
 *   >
 *     Content
 *   </motion.div>
 * );
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const { once = true, margin = '-50px', amount = 0.3, ...rest } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(ref, {
    once,
    margin,
    amount,
    ...rest,
  });

  return { ref, isInView };
}

export default useScrollAnimation;
