'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { type InfoCard } from '@/lib/types/contentful'

interface ProgramCardsProps {
  items: InfoCard[]
  icons?: Record<string, ReactNode>
}

const ACCENT_COLORS = [
  'text-green-600',
  'text-blue-500',
  'text-purple-600',
  'text-orange-500',
  'text-pink-600',
]

// rgba values derived from the brand color palette
const GLOW_COLORS = [
  'rgba(94, 231, 62, 0.18)',   // green-300
  'rgba(36, 126, 228, 0.18)',  // blue-500
  'rgba(89, 67, 232, 0.18)',   // purple-600
  'rgba(208, 91, 26, 0.18)',   // orange-500
  'rgba(164, 23, 185, 0.18)',  // pink-600
]

const PAD = 'px-8 pt-10 pb-10 md:px-16 md:pt-14'

function CardContent({
  item,
  index,
  icon,
  accent,
}: {
  item: InfoCard
  index: number
  icon: ReactNode | null
  accent: string
}) {
  return (
    <>
      {icon && <div className={`mb-5 ${accent}`}>{icon}</div>}
      <p className={`mb-2 font-mono text-[11px] tracking-[0.12em] uppercase ${accent}`}>
        Program {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className='mb-4 font-serif text-[26px] leading-[34px] font-light tracking-[-0.01em] text-black italic sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px]'>
        {item.name}
      </h3>
      <p className='max-w-xl font-sans text-base leading-6 text-gray-600'>
        {item.description}
      </p>
      {item.link && (
        <Link
          href={item.link}
          className={`mt-8 block font-mono text-[12px] tracking-[0.06em] hover:underline ${accent}`}
        >
          Learn more &rarr;
        </Link>
      )}
    </>
  )
}

export function ProgramCards({ items, icons }: ProgramCardsProps) {
  const [active, setActive] = useState(0)
  const current = items[active]
  const currentIcon = icons && current.icon ? icons[current.icon] : null
  const accent = ACCENT_COLORS[active % ACCENT_COLORS.length]

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
      className='border-t border-border-subtle'
    >
      {/* Heading */}
      <div className='px-8 pt-16 pb-8 md:px-16'>
        <p className='mb-5 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
          Our programs
        </p>
        <h2 className='font-serif text-[32px] font-light leading-[40px] tracking-[-0.01em] text-black sm:text-[40px] sm:leading-[48px]'>
          Community in action
        </h2>
      </div>

      {/* Tab row — overflow-x-auto handles mobile when names are long */}
      <div className='overflow-x-auto border-b border-border-subtle'>
        <div className='flex min-w-max items-end px-8 md:px-16'>
          {items.map((item, i) => {
            const isActive = active === i
            return (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`
                  -mb-px shrink-0 cursor-pointer rounded-t-[4px] border
                  whitespace-nowrap px-5 py-2.5 font-sans text-[13px] transition-colors
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
      </div>

      {/* Content area */}
      <div className='pb-16 md:pb-24'>
        <div className='relative'>

          {/* Ghost layer — all cards rendered invisibly to set container height = tallest card */}
          <div className='grid' aria-hidden='true'>
            {items.map((item, i) => {
              const itemIcon = icons && item.icon ? icons[item.icon] : null
              return (
                <div
                  key={item.name}
                  className={`invisible pointer-events-none row-start-1 col-start-1 ${PAD}`}
                >
                  <CardContent
                    item={item}
                    index={i}
                    icon={itemIcon}
                    accent={ACCENT_COLORS[i % ACCENT_COLORS.length]}
                  />
                </div>
              )
            })}
          </div>

          {/* Glow layer — radial glow crossfades behind the text, no movement */}
          <div className='absolute inset-0 overflow-hidden'>
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='absolute inset-0'
                style={{
                  background: `radial-gradient(ellipse 40% 50% at 15% 50%, ${GLOW_COLORS[i % GLOW_COLORS.length]} 0%, transparent 100%)`,
                }}
              />
            ))}
          </div>

          {/* Content layer — text slides in from the side */}
          <div className='absolute inset-0 overflow-hidden'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 16 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                exit={{
                  opacity: 0,
                  x: -12,
                  transition: { duration: 0.18 },
                }}
                className={PAD}
              >
                <CardContent
                  item={current}
                  index={active}
                  icon={currentIcon}
                  accent={accent}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.section>
  )
}
