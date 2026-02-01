import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CardProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
  href?: string
}

export function Card({ icon, title, description, className, href }: CardProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-start px-6 py-8 bg-blue-50 rounded-lg',
        className,
      )}
    >
      {icon && <div className='mb-6'>{icon}</div>}
      <h3 className='text-xl font-sans mb-2'>{title}</h3>
      <p className='text-base font-serif'>{description}</p>
      {href && (
        <Link
          href={href}
          className='mt-auto font-mono text-sm hover:underline pt-4'
        >
          Learn more &rarr;
        </Link>
      )}
    </div>
  )
}
