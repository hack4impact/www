import Link from 'next/link'
import { cn } from '@/lib/utils'

const CTA_ITEMS = [
  {
    audience: 'For Students',
    headline: 'Code for communities.',
    description:
      'Join a chapter, work on real projects, and build technology that makes a difference.',
    links: [{ text: 'Join a chapter', href: '/get-involved/students' }],
    color: 'text-blue-500',
  },
  {
    audience: 'For Nonprofits',
    headline: 'Work with students.',
    description:
      'Get a dedicated student team to build the tool your mission needs — at no cost.',
    links: [{ text: 'Submit a project', href: '/get-involved/nonprofits' }],
    color: 'text-green-600',
  },
  {
    audience: 'For Mentors & Sponsors',
    headline: 'Support the mission.',
    description:
      'Guide student teams, fund chapters, or partner with us to grow our reach.',
    links: [
      { text: 'Become a mentor', href: '/get-involved/mentors' },
      { text: 'Become a sponsor', href: '/get-involved/sponsors' },
    ],
    color: 'text-purple-600',
  },
]

export function CTABand() {
  return (
    <section className='border-t border-border-subtle bg-bg-cta px-8 py-16 md:px-16'>
      <div className='mx-auto max-w-[1312px]'>
        <div className='grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0'>
          {CTA_ITEMS.map((item, i) => (
            <div
              key={item.audience}
              className={cn(
                'flex flex-col gap-5 py-10 md:py-0',
                i > 0 && 'md:pl-12',
                i < 2 && 'md:pr-12',
              )}
            >
              <p
                className={cn(
                  'font-mono text-[11px] uppercase tracking-[0.12em]',
                  item.color,
                )}
              >
                {item.audience}
              </p>
              <h2 className='font-serif text-[34px] font-light italic leading-[1.1] tracking-[-0.01em] text-black'>
                {item.headline}
              </h2>
              <p className='font-sans text-base leading-6 text-gray-500'>
                {item.description}
              </p>
              <div className='flex flex-wrap gap-x-5 gap-y-2'>
                {item.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-[0.06em] hover:underline',
                      item.color,
                    )}
                  >
                    {link.text} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
