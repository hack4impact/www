import { cn } from '@/lib/utils'

interface WorkHeaderProps {
  label: string
  title: string
  description: string
  countLabel: string
  labelColor?: string
  gradientOklab?: string
}

export function WorkHeader({
  label,
  title,
  description,
  countLabel,
  labelColor = 'text-green-600',
  gradientOklab = '93.5% -0.050 0.016', // Default to Projects gradient
}: WorkHeaderProps) {
  return (
    <section
      className='border-b border-border-subtle px-8 pb-12 pt-14 md:px-16'
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: `radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(${gradientOklab}) 0%, oklab(0% 0 0 / 0%) 60%)`,
        backgroundOrigin: 'border-box',
      }}
    >
      <div className='mx-auto max-w-[1312px]'>
        <div className='flex items-baseline justify-between pb-4'>
          <p
            className={cn(
              'font-mono text-[11px] uppercase tracking-[0.12em]',
              labelColor,
            )}
          >
            {label}
          </p>
          <p className='font-mono text-[11px] tracking-[0.08em] text-gray-400'>
            {countLabel}
          </p>
        </div>
        <h1 className='pb-4 font-serif text-[40px] font-light leading-[48px] tracking-[-0.02em] text-black'>
          {title}
        </h1>
        <p className='font-sans text-base leading-6 text-text-muted max-w-2xl'>
          {description}
        </p>
      </div>
    </section>
  )
}
