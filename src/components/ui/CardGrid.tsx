import Image from 'next/image'
import { type ReactNode } from 'react'
import { Card } from '@/components/ui/Card'
import { InfoCard } from '@/lib/types/contentful'

interface CardGridProps {
  heading: string
  items: InfoCard[]
  columns?: 3 | 4
  description?: string
  icons?: Record<string, ReactNode>
  className?: string
}

export function CardGrid({
  heading,
  items,
  columns = 3,
  description,
  icons,
  className = '',
}: CardGridProps) {
  const gridCols =
    columns === 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 lg:grid-cols-3'

  return (
    <section className={`px-8 md:px-12 py-16 md:py-24 ${className}`}>
      <h2
        className={`font-sans text-center ${
          description ? 'text-2xl md:text-3xl mb-4' : 'text-3xl mb-12'
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p className='font-serif text-gray-600 text-center max-w-2xl mx-auto mb-12'>
          {description}
        </p>
      )}
      <div className={`grid ${gridCols} gap-8`}>
        {items.map((item) => (
          <Card
            key={item.name}
            icon={
              icons ? (item.icon ? icons[item.icon] : undefined) : undefined
            }
            title={item.name}
            description={item.description}
          />
        ))}
      </div>
    </section>
  )
}
