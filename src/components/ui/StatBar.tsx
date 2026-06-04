import type { ReactNode } from 'react'
import { AnimatedCounter } from './AnimatedCounter'
import { cn } from '@/lib/utils'

interface StatBarItem {
  label: string
  value: string | number | ReactNode
}

interface StatBarProps {
  stats: StatBarItem[]
  heading?: string
  variant?: 'grid' | 'bar'
}

// Tailwind purges dynamic classes; map to static strings
const lgGridCols: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

export function StatBar({ stats, heading, variant = 'grid' }: StatBarProps) {
  if (variant === 'bar') {
    return (
      <section className='px-8 md:px-16'>
        <div className='mx-auto flex max-w-[1312px]'>
          {stats.map((stat, index) => (
            <div
              key={stat.label || index}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-2 py-7',
                index < stats.length - 1 && 'border-r border-border-subtle',
              )}
            >
              {typeof stat.value === 'string' || typeof stat.value === 'number' ? (
                <span className='font-serif text-[32px] leading-[40px] font-light tracking-[-0.01em] text-black'>
                  {stat.value}
                </span>
              ) : (
                stat.value
              )}
              {stat.label && (
                <span className='font-mono text-[11px] tracking-[0.1em] text-gray-500 uppercase'>
                  {stat.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className='px-8 py-16 md:px-16 md:py-24'>
      {heading && (
        <h2 className='mb-12 text-center font-sans text-3xl'>{heading}</h2>
      )}
      <div
        className={cn(
          'mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center',
          lgGridCols[stats.length] ?? 'lg:grid-cols-3',
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter
              to={stat.value as string | number}
              className='font-sans text-4xl md:text-5xl'
            />
            <p className='mt-2 font-serif text-gray-600'>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
