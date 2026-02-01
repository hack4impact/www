import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
}

export function Card({ icon, title, description, className }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start px-6 py-8 bg-blue-50 rounded-lg',
        className,
      )}
    >
      {icon && <div className='mb-6'>{icon}</div>}
      <h3 className='text-xl font-sans mb-2'>{title}</h3>
      <p className='text-base font-serif'>{description}</p>
    </div>
  )
}
