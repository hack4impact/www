import type { Sponsor } from '@/lib/types/contentful'

export interface SponsorGroup {
  tier: string
  sponsors: Sponsor[]
}

interface SponsorsGridProps {
  heading?: string
  groups: SponsorGroup[]
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const content = sponsor.logoUrl ? (
    <img
      src={sponsor.logoUrl}
      alt={sponsor.name}
      className='h-10 w-auto max-w-full object-contain'
    />
  ) : (
    <span className='text-center font-sans text-sm leading-tight text-gray-700 transition-colors group-hover:text-black'>
      {sponsor.name}
    </span>
  )

  const baseClass =
    'flex min-h-[80px] w-full items-center justify-center rounded-xl border border-gray-200 bg-white p-4'

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target='_blank'
        rel='noopener noreferrer'
        className={`${baseClass} group transition-colors hover:border-gray-300`}
      >
        {content}
      </a>
    )
  }

  return <div className={baseClass}>{content}</div>
}

export function SponsorsGrid({ heading, groups }: SponsorsGridProps) {
  if (groups.length === 0) return null

  return (
    <>
      {heading && (
        <h2 className='mb-8 font-serif text-[40px] leading-[48px] font-light tracking-[-0.01em] text-black'>
          {heading}
        </h2>
      )}
      <div className='space-y-10'>
        {groups.map((group) => (
          <div key={group.tier}>
            <div className='mb-4 border-b border-gray-200 pb-2'>
              <span className='label-xs text-gray-400'>{group.tier}</span>
            </div>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {group.sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
