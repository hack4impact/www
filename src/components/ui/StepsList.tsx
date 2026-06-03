'use client'

import type { ProcessStep } from '@/lib/types/contentful'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/utils'

const containerVariants = staggerContainer(0.12)
const stepVariants = fadeInUp(0.5)

interface StepsListProps {
  steps: ProcessStep[]
  numbered?: boolean
  label?: string
  title?: string
  accentColor?: string
}

export function StepsList({
  steps,
  numbered = true,
  label,
  title,
  accentColor = 'text-blue-600',
}: StepsListProps) {
  return (
    <motion.div
      className='flex flex-col divide-y divide-gray-200 border-b border-gray-200'
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.15 }}
    >
      {(label || title) && (
        <div className='flex flex-col gap-2 pt-2 pb-8'>
          {label && (
            <p className={cn('font-mono text-[11px] uppercase tracking-[0.15em]', accentColor)}>
              {label}
            </p>
          )}
          {title && (
            <h2 className='font-serif text-[40px] font-light leading-[48px] tracking-[-0.01em] text-black'>
              {title}
            </h2>
          )}
        </div>
      )}
      {steps.map((step, i) => (
        <motion.div key={step.name} className='flex items-start py-7' variants={stepVariants}>
          {numbered && (
            <>
              <span className={cn('w-24 shrink-0 font-serif text-5xl font-light leading-none opacity-40', accentColor)}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className='mr-8 w-px shrink-0 self-stretch bg-gray-200' />
            </>
          )}
          <div className='flex flex-col gap-1.5 pt-1'>
            <h3 className='font-sans text-base font-medium text-gray-900'>{step.name}</h3>
            <p className='font-sans text-sm leading-[1.5] text-gray-600'>{step.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
