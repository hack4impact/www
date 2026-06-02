import Link from 'next/link'

const CTA_ITEMS = [
  {
    audience: 'For Students',
    headline: 'Code for communities.',
    description:
      'Join a chapter, work on real projects, and build technology that makes a difference.',
    linkText: 'Join a chapter',
    href: '/get-involved/students',
    color: 'text-blue-500',
  },
  {
    audience: 'For Nonprofits',
    headline: 'Work with students.',
    description:
      'Get a dedicated student team to build the tool your mission needs — at no cost.',
    linkText: 'Submit a project',
    href: '/get-involved/nonprofits',
    color: 'text-green-500',
  },
  {
    audience: 'For Mentors & Sponsors',
    headline: 'Support the mission.',
    description:
      'Guide student teams, fund chapters, or partner with us to grow our reach.',
    linkText: 'Get in touch',
    href: '/get-involved/mentors',
    color: 'text-purple-500',
  },
]

export function CTABand() {
  return (
    <section
      className='border-t border-[#E8E8E4] px-8 py-16 md:px-16'
      style={{ backgroundColor: '#f7f7f4' }}
    >
      <div className='mx-auto max-w-[1312px]'>
        <div className='grid grid-cols-1 divide-y divide-[#E8E8E4] md:grid-cols-3 md:divide-x md:divide-y-0'>
          {CTA_ITEMS.map((item, i) => (
            <div
              key={item.href}
              className={[
                'flex flex-col gap-5 py-10 md:py-0',
                i > 0 ? 'md:pl-12' : '',
                i < 2 ? 'md:pr-12' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.12em] ${item.color}`}
              >
                {item.audience}
              </p>
              <h2 className='font-serif text-[34px] font-light italic leading-[1.1] tracking-[-0.01em] text-black'>
                {item.headline}
              </h2>
              <p className='font-sans text-base leading-6 text-gray-500'>
                {item.description}
              </p>
              <Link
                href={item.href}
                className={`font-sans text-base font-semibold ${item.color} hover:underline`}
              >
                {item.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
