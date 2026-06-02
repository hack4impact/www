interface LinkCardProps {
  label: string
  href: string
  className?: string
}

export function LinkCard({ label, href, className = '' }: LinkCardProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`group flex items-center justify-between gap-6 border border-[#e8e8e8] px-5 py-4 transition-colors hover:border-gray-400 ${className}`}
    >
      <span className='font-mono text-[11px] uppercase tracking-[0.12em] text-black'>
        {label}
      </span>
      <span className='text-gray-400 transition-colors group-hover:text-black'>↗</span>
    </a>
  )
}
