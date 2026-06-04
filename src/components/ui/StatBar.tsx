import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatBarItem {
  label: string
  value: string | number | ReactNode
}

interface StatBarProps {
  stats: StatBarItem[]
}

export function StatBar({ stats }: StatBarProps) {
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
