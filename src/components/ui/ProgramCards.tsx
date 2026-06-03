'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { type InfoCard } from '@/lib/types/contentful'

interface ProgramCardsProps {
  items: InfoCard[]
  icons?: Record<string, ReactNode>
}

export function ProgramCards({ items, icons }: ProgramCardsProps) {
  const [active, setActive] = useState(0)
  const current = items[active]
  const currentIcon = icons && current.icon ? icons[current.icon] : null

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
      className='border-t border-border-subtle'
    >
      {/* Tab row — border-b is the dividing line tabs "sit on" */}
      <div className='flex items-end border-b border-border-subtle px-8 pt-6 md:px-16'>
        {items.map((item, i) => {
          const isActive = active === i
          return (
            <button
              key={item.name}
              onClick={() => setActive(i)}
              className={`
                -mb-px cursor-pointer rounded-t-[4px] border px-5 py-2.5
                font-sans text-[13px] transition-colors
                ${isActive
                  ? 'border-border-subtle border-b-0 bg-white font-medium text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {item.name}
            </button>
          )
        })}
      </div>

      {/* Content panel */}
      <div className='relative min-h-[300px] overflow-hidden bg-white'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className='absolute inset-0 flex flex-col justify-center px-8 py-14 md:px-16'
          >
            {currentIcon && (
              <div className='mb-5 text-blue-500'>{currentIcon}</div>
            )}
            <p className='mb-2 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
              Program {String(active + 1).padStart(2, '0')}
            </p>
            <h3 className='mb-4 font-serif text-[36px] leading-[44px] font-light tracking-[-0.01em] text-black italic'>
              {current.name}
            </h3>
            <p className='max-w-xl font-serif text-[15px] leading-6 text-gray-600'>
              {current.description}
            </p>
            {current.link && (
              <Link
                href={current.link}
                className='mt-7 font-mono text-[12px] tracking-[0.06em] text-blue-500 hover:underline'
              >
                Learn more &rarr;
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
