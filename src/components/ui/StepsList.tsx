'use client'

import type { ProcessStep } from '@/lib/types/contentful'
import { motion } from 'framer-motion'

// Animation Variants
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

interface StepsListProps {
  steps: ProcessStep[]
  numbered?: boolean
  stretch?: boolean
}

export function StepsList({
  steps,
  numbered = true,
  stretch = false,
}: StepsListProps) {
  return (
    <motion.div
      className={`flex flex-col divide-y divide-gray-200 border-t border-gray-200${
        stretch ? ' justify-between h-full' : ''
      }`}
      variants={listContainerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
    >
      {steps.map((step) => (
        <motion.div
          key={step.name}
          className={`relative${
            stretch ? ' flex-1 flex flex-col justify-center py-4' : ' py-6'
          }`}
          variants={stepVariants}
        >
          {numbered && (
            <span
              className={`absolute right-0 font-mono text-gray-400${
                stretch ? ' top-4' : ' top-6'
              }`}
            >
              {String(steps.indexOf(step) + 1).padStart(2, '0')}
            </span>
          )}
          <h3 className='text-lg font-sans mb-1'>{step.name}</h3>
          <p className={`font-serif text-gray-600${numbered ? ' pr-12' : ''}`}>
            {step.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

