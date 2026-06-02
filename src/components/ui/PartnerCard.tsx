import Link from 'next/link'
import type { Partner } from '@/lib/types/partner'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Link
      href={`/work/partners/${partner.slug}`}
      className='group flex aspect-square flex-col items-center justify-center rounded-lg border border-[#E8E8E4] p-3 transition-colors hover:border-gray-300'
    >
      <p className='text-center font-sans text-sm leading-tight text-gray-600 transition-colors group-hover:text-black'>
        {partner.name}
      </p>
      {partner.projectCount > 0 && (
        <p className='mt-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-gray-400'>
          {partner.projectCount} {partner.projectCount === 1 ? 'project' : 'projects'}
        </p>
      )}
    </Link>
  )
}
