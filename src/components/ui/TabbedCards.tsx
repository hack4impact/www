'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs } from '@base-ui/react'
import { type InfoCard } from '@/lib/types/contentful'
import { cn } from '@/lib/utils'

interface TabbedCardsProps {
  items: InfoCard[]
  label?: string
  heading?: string
  cardLabel?: string
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
  'rgba(94, 231, 62, 0.18)', // green-300
  'rgba(36, 126, 228, 0.18)', // blue-500
  'rgba(89, 67, 232, 0.18)', // purple-600
  'rgba(208, 91, 26, 0.18)', // orange-500
  'rgba(164, 23, 185, 0.18)', // pink-600
]

const PAD = 'px-8 pt-10 pb-10 md:px-16 md:pt-14'

function CardContent({
  item,
  index,
  accent,
  cardLabel,
}: {
  item: InfoCard
  index: number
  accent: string
  cardLabel: string
}) {
  return (
    <>
      <p className={cn('label mb-2', accent)}>
        {cardLabel} {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className={cn('heading-card mb-4 sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px]')}>
        {item.name}
      </h3>
      <p className='text-gray-3 max-w-xl font-sans text-base leading-6'>
        {item.description}
      </p>
      {item.link && (
        <Link
          href={item.link}
          className={cn('label-xs mt-8 block hover:underline', accent)}
        >
          Learn more &rarr;
        </Link>
      )}
    </>
  )
}

export function TabbedCards({
  items,
  label = 'Our programs',
  heading = 'Community in action',
  cardLabel = 'Program',
}: TabbedCardsProps) {
  const [active, setActive] = useState(0)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, amount: 0.1 }}
      className='border-separator border-t'
    >
      {/* Heading */}
      <div className='px-8 pt-16 pb-8 md:px-16'>
        <p className='label mb-5 text-blue-500'>{label}</p>
        <h2 className='heading-section'>{heading}</h2>
      </div>

      <Tabs.Root
        value={active}
        onValueChange={(val) => setActive(val as number)}
      >
        {/* Tab row */}
        <div className='overflow-x-auto'>
          <Tabs.List className='border-separator flex min-w-max items-end border-b px-8 md:px-16'>
            {items.map((item, i) => (
              <Tabs.Tab
                key={item.name}
                value={i}
                className={cn(
                  '-mb-px shrink-0 cursor-pointer rounded-t-lg border px-5 py-2.5 font-sans text-[15px] whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/50',
                  active === i
                    ? 'border-separator border-b-root bg-root font-medium text-inverse'
                    : 'border-transparent text-gray-3 hover:text-inverse',
                )}
              >
                {item.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </div>

        {/* Content area */}
        <div className='pb-16 md:pb-20'>
          <div className='relative'>
            {/* Ghost layer — sets container height to tallest card */}
            <div className='grid' aria-hidden='true'>
              {items.map((item, i) => (
                <div
                  key={item.name}
                  className={`pointer-events-none invisible col-start-1 row-start-1 ${PAD}`}
                >
                  <CardContent
                    item={item}
                    index={i}
                    accent={ACCENT_COLORS[i % ACCENT_COLORS.length]}
                    cardLabel={cardLabel}
                  />
                </div>
              ))}
            </div>

            {/* Glow layer */}
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

            {/* Content layer */}
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
                  exit={{ opacity: 0, x: -12, transition: { duration: 0.18 } }}
                  className={PAD}
                >
                  <CardContent
                    item={items[active]}
                    index={active}
                    accent={ACCENT_COLORS[active % ACCENT_COLORS.length]}
                    cardLabel={cardLabel}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Tabs.Root>
    </motion.section>
  )
}
