import Link from 'next/link'

interface SplitCTASide {
  label: string
  heading: string
  description: string
  linkText: string
  linkHref: string
  linkArrow?: string
  color?: string
}

interface SplitCTAProps {
  left: SplitCTASide
  right: SplitCTASide
}

function Side({ side, border }: { side: SplitCTASide; border?: string }) {
  const color = side.color ?? 'text-gray-700'
  return (
    <div className={`flex grow basis-0 flex-col gap-4 ${border ?? ''}`}>
      <p className={`font-mono text-[11px] tracking-[0.12em] uppercase ${color}`}>
        {side.label}
      </p>
      <div className='flex flex-col gap-2.5'>
        <h2 className='font-serif text-[26px] leading-8 font-light text-black'>
          {side.heading}
        </h2>
        <p className='font-sans text-sm leading-[22px] text-gray-500'>
          {side.description}
        </p>
      </div>
      <Link href={side.linkHref} className='flex items-center gap-1.5'>
        <span className={`font-sans text-sm font-medium ${color}`}>{side.linkText}</span>
        {side.linkArrow && (
          <span className={`font-sans text-sm ${color}`}>{side.linkArrow}</span>
        )}
      </Link>
    </div>
  )
}

export function SplitCTA({ left, right }: SplitCTAProps) {
  return (
    <div className='border-border-subtle border-b px-8 py-16 md:px-16'>
      <div className='flex flex-col md:flex-row'>
        <Side
          side={left}
          border='border-border-subtle border-b pb-8 md:border-b-0 md:border-r md:pb-8 md:pr-10 md:pt-8'
        />
        <Side side={right} border='pt-8 md:pl-10 md:pt-8 md:pb-8' />
      </div>
    </div>
  )
}
