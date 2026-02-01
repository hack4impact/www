'use client'

import { useEffect, useRef } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
  to: number
  className?: string
}

export function AnimatedCounter({ to, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!inView || !ref.current) return

    // Set initial text content to 0 before starting animation
    ref.current.textContent = '0'

    const controls = animate(0, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value) {
        if (ref.current) {
          // Format with commas for larger numbers
          ref.current.textContent = Math.round(value).toLocaleString()
        }
      },
    })

    return () => controls.stop()
  }, [inView, to])

  return <p ref={ref} className={className} />
}
