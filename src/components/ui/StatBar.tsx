import type { Stat } from '@/lib/types/stat'
import { AnimatedCounter } from './AnimatedCounter'

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
    <section className='px-8 md:px-12 py-16 md:py-24'>
      {heading && (
        <h2 className='text-3xl font-sans mb-12 text-center'>{heading}</h2>
      )}
      <div
        className={`grid grid-cols-2 ${
          lgGridCols[stats.length] ?? 'lg:grid-cols-3'
        } gap-8 max-w-4xl mx-auto text-center`}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedCounter
              to={stat.value}
              className='text-4xl md:text-5xl font-sans'
            />
            <p className='mt-2 font-serif text-gray-600'>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
