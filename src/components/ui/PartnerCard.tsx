import type { Partner } from '@/lib/types/partner'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className='group flex h-full min-h-[96px] flex-col items-center justify-center rounded-xl border border-separator bg-panel p-3.5 transition-colors hover:border-gray-4'>
      <p className='text-center font-sans text-sm leading-tight text-gray-2 transition-colors group-hover:text-inverse'>
        {partner.name}
      </p>
      {partner.projectCount > 0 && (
        <p className='mt-1.5 font-mono text-[9px] tracking-[0.06em] text-gray-3 uppercase'>
          {partner.projectCount}{' '}
          {partner.projectCount === 1 ? 'project' : 'projects'}
        </p>
      )}
    </div>
  )
}
