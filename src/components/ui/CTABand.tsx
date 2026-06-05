import Link from 'next/link'
import { cn } from '@/lib/utils'

const CTA_ITEMS = [
  {
    audience: 'For Students',
    headline: 'Code for communities.',
    description: 'Join a chapter and build real software for nonprofits.',
    links: [{ text: 'Join a chapter', href: '/get-involved/students' }],
    color: 'text-blue-500',
  },
  {
    audience: 'For Nonprofits',
    headline: 'Work with students.',
    description: 'Get a student team to build your next tool — free of charge.',
    links: [{ text: 'Submit a project', href: '/get-involved/nonprofits' }],
    color: 'text-green-600',
  },
  {
    audience: 'For Mentors',
    headline: 'Guide the next generation.',
    description: 'Share your expertise with student teams doing real work.',
    links: [{ text: 'Become a mentor', href: '/get-involved/mentors' }],
    color: 'text-purple-600',
  },
  {
    audience: 'For Sponsors',
    headline: 'Fund the mission.',
    description: 'Power the chapters and projects driving tech for good.',
    links: [{ text: 'Become a sponsor', href: '/get-involved/sponsors' }],
    color: 'text-orange-500',
  },
]

export function CTABand() {
  return (
    <section className='page-section-sm bg-root'>
      <div className='section-inner'>
        <div className='grid grid-cols-1 divide-y divide-separator sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(n+3)]:border-separator lg:grid-cols-4 lg:[&>*:nth-child(n+3)]:border-t-0'>
          {CTA_ITEMS.map((item, i) => (
            <div
              key={item.audience}
              className={cn(
                'flex flex-col gap-3 py-8 sm:py-6 lg:py-0',
                i % 2 !== 0 && 'sm:pl-10',
                i % 2 === 0 && 'sm:pr-10',
                i > 0 && 'lg:pl-10',
                i < 3 && 'lg:pr-10',
              )}
            >
              <p className={cn('label', item.color)}>{item.audience}</p>
              <h2 className={cn('heading-card leading-[1.1]')}>{item.headline}</h2>
              <p className='font-sans text-sm leading-5 text-gray-500'>{item.description}</p>
              <div className='flex flex-wrap gap-x-5 gap-y-2'>
                {item.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn('label-xs hover:underline', item.color)}
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
