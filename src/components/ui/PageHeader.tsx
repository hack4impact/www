import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
  secondaryLabel?: string
  labelClassName?: string
  className?: string
  children?: ReactNode
}

export function PageHeader({
  label,
  title,
  description,
  secondaryLabel,
  labelClassName = 'text-green-600',
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        'border-b border-border-subtle px-8 pb-12 pt-14 md:px-16',
        'bg-white',
        className,
      )}
      style={{
        backgroundImage:
          'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(93.5% -0.050 0.016) 0%, oklab(0% 0 0 / 0%) 60%)',
        backgroundOrigin: 'border-box',
      }}
    >
      <div className='mx-auto max-w-[1312px]'>
        <div className='flex items-baseline justify-between pb-4'>
          <p
            className={cn(
              'font-mono text-[11px] uppercase tracking-[0.12em]',
              labelClassName,
            )}
          >
            {label}
          </p>
          {secondaryLabel && (
            <p className='font-mono text-[11px] tracking-[0.08em] text-gray-400'>
              {secondaryLabel}
            </p>
          )}
        </div>
        <h1 className='pb-4 font-serif text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-black md:text-[56px]'>
          {title}
        </h1>
        {description && (
          <p className='max-w-2xl font-sans text-base leading-6 text-text-muted'>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
