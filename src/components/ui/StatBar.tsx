import type { Stat } from '@/lib/types/stat'
import { AnimatedCounter } from './AnimatedCounter'
import { cn } from '@/lib/utils'

interface StatBarProps {
  stats: Stat[]
  heading?: string
}

// Tailwind purges dynamic classes; map to static strings
const lgGridCols: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
}

export function StatBar({ stats, heading }: StatBarProps) {
  return (
    <section className='px-8 py-16 md:px-12 md:py-24'>
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
              to={stat.value}
              className='font-sans text-4xl md:text-5xl'
            />
            <p className='mt-2 font-serif text-gray-600'>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
