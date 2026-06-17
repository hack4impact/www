import { ReactNode } from 'react'
import { TEXT_CLASS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Collapsible } from './Collapsible'

interface CollapsibleItem {
  title: string
  content: ReactNode
}

interface CollapsibleListProps {
  label?: string
  items: CollapsibleItem[]
  color?: string
}

export function CollapsibleList({
  label = 'Common Questions',
  items,
  color = 'blue',
}: CollapsibleListProps) {
  return (
    <section className='page-section'>
      <div className='section-inner'>
        <p className={cn('label mb-12', TEXT_CLASS[color])}>{label}</p>
        {items.map((item, i) => (
          <Collapsible
            key={item.title}
            title={item.title}
            content={item.content}
            i={i}
            color={color}
          />
        ))}
      </div>
    </section>
  )
}
