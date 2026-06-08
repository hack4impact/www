import { cn } from '@/lib/utils'

const GRADIENT_CLASS: Record<string, string> = {
  'text-blue-500':  'gradient-bl-blue',
  'text-blue-600':  'gradient-bl-blue',
  'text-green-600': 'gradient-bl-green',
  'text-purple-600':'gradient-bl-purple',
  'text-orange-500':'gradient-bl-orange',
  'text-orange-600':'gradient-bl-orange',
}

interface ListingHeaderProps {
  label: string
  title: string
  description: string
  countLabel: string
  labelColor?: string
}

export function ListingHeader({
  label,
  title,
  description,
  countLabel,
  labelColor = 'text-green-600',
}: ListingHeaderProps) {
  return (
    <section
      className={cn(
        GRADIENT_CLASS[labelColor] ?? 'gradient-bl-blue',
        'border-separator border-b px-8 pt-14 pb-12 md:px-16',
      )}
    >
      <div className='section-inner'>
        <div className='flex items-baseline justify-between pb-4'>
          <p className={cn('label', labelColor)}>{label}</p>
          <p className='label text-gray-3'>{countLabel}</p>
        </div>
        <h1 className='heading-display pb-4'>{title}</h1>
        <p className='text-gray-3 max-w-4xl font-sans text-base leading-6'>{description}</p>
      </div>
    </section>
  )
}
