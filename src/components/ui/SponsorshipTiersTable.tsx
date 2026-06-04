import { Check } from 'iconoir-react'
import { cn } from '@/lib/utils'
import type { SponsorshipTier } from '@/lib/types/contentful'

interface Props {
  tiers: SponsorshipTier[]
}

function formatCost(cost: number): string {
  return `$${cost.toLocaleString('en-US')}`
}

const gridColsMap: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

export function SponsorshipTiersTable({ tiers }: Props) {
  const allBenefits: string[] = []
  for (const tier of tiers) {
    for (const b of tier.benefits) {
      if (!allBenefits.includes(b)) allBenefits.push(b)
    }
  }

  const gridCols = gridColsMap[tiers.length + 1] ?? 'grid-cols-4'

  return (
    <>
      <h2 className='mb-8 text-center font-serif text-[40px] leading-[48px] font-light tracking-[-0.01em] text-black'>
        Sponsorship tiers
      </h2>

      {/* Desktop comparison table */}
      <div className='hidden md:block'>
        <div className='divide-y divide-gray-200'>
          {/* Column headers */}
          <div className={cn('grid py-3', gridCols)}>
            <span className='font-mono text-[10px] tracking-[0.06em] uppercase text-gray-400'>
              Benefits
            </span>
            {tiers.map((tier) => (
              <span
                key={tier.name}
                className='text-center font-mono text-[10px] tracking-[0.06em] uppercase text-gray-500'
              >
                {tier.name}
              </span>
            ))}
          </div>

          {/* Cost row */}
          <div className={cn('grid items-center py-4', gridCols)}>
            <span className='font-mono text-[10px] tracking-[0.06em] uppercase text-gray-400'>
              Annual Contribution
            </span>
            {tiers.map((tier) => (
              <span key={tier.name} className='text-center font-serif text-sm text-gray-600'>
                {formatCost(tier.cost)}
              </span>
            ))}
          </div>

          {/* Benefit rows */}
          {allBenefits.map((benefit) => (
            <div key={benefit} className={cn('grid items-center py-4', gridCols)}>
              <span className='font-sans text-sm text-gray-900'>{benefit}</span>
              {tiers.map((tier) => (
                <div key={tier.name} className='flex items-center justify-center'>
                  {tier.benefits.includes(benefit) && (
                    <Check width={16} height={16} strokeWidth={2} className='text-blue-500' />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked tier cards */}
      <div className='divide-y divide-gray-200 md:hidden'>
        {tiers.map((tier) => (
          <div key={tier.name} className='py-6'>
            <div className='flex items-baseline justify-between gap-4'>
              <span className='font-mono text-[10px] tracking-[0.06em] uppercase text-gray-500'>
                {tier.name}
              </span>
              <span className='font-serif text-sm text-gray-600'>{formatCost(tier.cost)}</span>
            </div>
            <ul className='mt-4 space-y-2'>
              {tier.benefits.map((b) => (
                <li key={b} className='flex items-start gap-2'>
                  <Check width={14} height={14} strokeWidth={2} className='mt-0.5 shrink-0 text-blue-500' />
                  <span className='font-sans text-sm text-gray-900'>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
