'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import { Separator } from '@base-ui/react/separator'
import { motion } from 'framer-motion'
import type { FAQ } from '@/lib/types/contentful'

interface FAQListProps {
  heading?: string
  items: FAQ[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FAQList({ heading = 'Common questions', items }: FAQListProps) {
  return (
    <section className='px-8 md:px-12 py-16 md:py-24'>
      <h2 className='text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center'>
        {heading}
      </h2>
      <motion.div
        className='max-w-3xl mx-auto'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        <Separator className='border-t border-gray-200' />
        {items.map((faq) => (
          <motion.div key={faq.question} variants={itemVariants}>
            <Collapsible.Root defaultOpen={false}>
              <div className='border-b border-gray-200'>
                <Collapsible.Trigger className='w-full py-6 text-left font-sans text-lg cursor-pointer flex items-center justify-between gap-4 group'>
                  <span>{faq.question}</span>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    className='shrink-0 text-gray-400 transition-transform group-data-[panel-open]:rotate-180'
                  >
                    <path
                      d='M5 7.5L10 12.5L15 7.5'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Collapsible.Trigger>
                <Collapsible.Panel className='overflow-hidden data-[ending-style]:animate-collapse-out data-[starting-style]:animate-collapse-out'>
                  <p className='font-serif text-gray-600 pb-6'>{faq.answer}</p>
                </Collapsible.Panel>
              </div>
            </Collapsible.Root>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
