import Image from 'next/image'
import Link from 'next/link'

const ORGANIZATION_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Chapters', href: '/work/chapters' },
  { label: 'Projects', href: '/work/projects' },
  { label: 'Partners', href: '/work/partners' },
]

const GET_INVOLVED_LINKS = [
  { label: 'Start a Chapter', href: '/get-involved/students' },
  { label: 'Apply for a Project', href: '/get-involved/nonprofits' },
  { label: 'Be a Mentor', href: '/get-involved/mentors' },
  { label: 'Sponsor Us', href: '/get-involved/sponsors' },
]

export default function Footer() {
  return (
    <footer className='border-t border-[#E8E8E4] bg-white'>
      {/* Main content */}
      <div className='px-8 py-14 md:px-16'>
        <div className='mx-auto flex max-w-[1312px] items-start justify-between gap-12'>
          {/* Left: logo + Candid seal */}
          <div className='flex flex-col gap-4'>
            <Link href='/' aria-label='Hack4Impact'>
              <Image
                src='/logomark.svg'
                alt='Hack4Impact'
                width={96}
                height={96}
                className='h-24 w-24 opacity-70 brightness-0'
              />
            </Link>
            <a
              aria-label='Candid transparency seal'
              href='https://app.candid.org/profile/9565390/hack4impact-81-0790890/?pkId=ed396921-76d9-4a6a-a362-b68f17102c35'
              target='_blank'
              rel='noopener noreferrer'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt='Candid Platinum Transparency Seal'
                src='https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9565390/svg'
                width={96}
                height={96}
                className='h-24 w-24'
              />
            </a>
          </div>

          {/* Right: nav columns */}
          <div className='flex gap-12 md:gap-16'>
            <div>
              <p className='mb-5 font-mono text-[10px] tracking-[0.12em] text-gray-400 uppercase'>
                Organization
              </p>
              <ul className='space-y-3'>
                {ORGANIZATION_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='font-sans text-sm text-gray-500 transition-colors hover:text-black'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className='mb-5 font-mono text-[10px] tracking-[0.12em] text-gray-400 uppercase'>
                Get Involved
              </p>
              <ul className='space-y-3'>
                {GET_INVOLVED_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='font-sans text-sm text-gray-500 transition-colors hover:text-black'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-[#E8E8E4] px-8 py-4 md:px-16'>
        <div className='mx-auto flex max-w-[1312px] items-center justify-between'>
          <p className='font-mono text-[10px] tracking-[0.04em] text-gray-400'>
            © {new Date().getFullYear()} Hack4Impact Inc. d/b/a Hack for Impact
            · EIN 81-0790890
          </p>
          <p className='font-mono text-[10px] tracking-[0.04em] text-gray-400'>
            501(c)(3) Public Charity
          </p>
        </div>
      </div>
    </footer>
  )
}
