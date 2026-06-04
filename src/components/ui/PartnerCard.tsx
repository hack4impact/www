import type { Partner } from '@/lib/types/partner'

interface PartnerCardProps {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className='group flex h-full min-h-[96px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-3.5 transition-colors hover:border-gray-300'>
      <p className='text-center font-sans text-sm leading-tight text-gray-600 transition-colors group-hover:text-black'>
        {partner.name}
      </p>
      {partner.projectCount > 0 && (
        <p className='mt-1.5 font-mono text-[9px] tracking-[0.06em] text-gray-400 uppercase'>
          {partner.projectCount}{' '}
          {partner.projectCount === 1 ? 'project' : 'projects'}
        </p>
      )}
    </div>
  )
}
