'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { InfoCard } from '@/lib/types/contentful'

// Animation variants
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

interface CardGridProps {
  heading?: string
  items: InfoCard[]
  columns?: 3 | 4
  description?: string
  icons?: Record<string, ReactNode>
  className?: string
}

export function CardGrid({
  heading,
  items,
  columns = 3,
  description,
  icons,
  className = '',
}: CardGridProps) {
  const gridCols =
    columns === 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 lg:grid-cols-3'

  return (
    <section className={`px-8 md:px-12 py-16 md:py-24 ${className}`}>
      {heading && (
        <motion.h2
          className={`font-sans text-center ${
            description ? 'text-2xl md:text-3xl mb-4' : 'text-3xl mb-12'
          }`}
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {heading}
        </motion.h2>
      )}
      {description && (
        <motion.p
          className='font-serif text-gray-600 text-center max-w-2xl mx-auto mb-12'
          variants={headerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className={`grid ${gridCols} gap-8`}
        variants={gridContainerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={cardVariants}
            className='h-full'
          >
            <Card
              icon={
                icons ? (item.icon ? icons[item.icon] : undefined) : undefined
              }
              title={item.name}
              description={item.description}
              href={item.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
