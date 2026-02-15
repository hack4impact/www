import type { Variants } from 'framer-motion'

export function staggerContainer(
  staggerDelay = 0.1,
  fade = true,
): Variants {
  return {
    hidden: fade ? { opacity: 0 } : {},
    visible: {
      ...(fade ? { opacity: 1 } : {}),
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }
}

export function fadeInUp(duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
  }
}
