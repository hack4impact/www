'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { NavigationMenu } from '@base-ui/react/navigation-menu'
import { Collapsible } from '@base-ui/react/collapsible'

const navigation = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
]

const workItems = [
  { label: 'Chapters', href: '/work/chapters' },
  { label: 'Projects', href: '/work/projects' },
  { label: 'Partners', href: '/work/partners' },
]

const getInvolvedItems = [
  { label: 'Nonprofits', href: '/get-involved/nonprofits' },
  { label: 'Students', href: '/get-involved/students' },
  { label: 'Mentors', href: '/get-involved/mentors' },
  { label: 'Sponsors', href: '/get-involved/sponsors' },
]

const chevronSvg = (
  <svg
    width='12'
    height='12'
    viewBox='0 0 12 12'
    fill='none'
    className='transition-transform group-data-[open]:rotate-180'
  >
    <path
      d='M3 4.5L6 7.5L9 4.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={`${mobileMenuOpen ? 'bg-[#FCF9F2]' : ''}`}>
      <nav className='flex items-center justify-between px-8 py-4 text-base md:px-12'>
        <Link href='/'>
          <Image
            src='/logomark.svg'
            alt='Hack4Impact'
            width={32}
            height={32}
            className='brightness-0 md:hidden'
          />
          <Image
            src='/logo.svg'
            alt='Hack4Impact'
            width={150}
            height={40}
            className='hidden md:block'
          />
        </Link>

        <NavigationMenu.Root
          render={<div />}
          className='hidden items-center gap-6 text-base md:flex'
        >
          <NavigationMenu.List className='m-0 flex list-none items-center gap-6 p-0'>
            {navigation.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link
                  render={<Link href={item.href} />}
                  active={pathname === item.href}
                >
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Item value='work'>
              <NavigationMenu.Trigger className='group flex cursor-pointer items-center gap-1'>
                Work
                {chevronSvg}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                {workItems.map((item) => (
                  <NavigationMenu.Link
                    key={item.href}
                    render={<Link href={item.href} />}
                    closeOnClick
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    {item.label}
                  </NavigationMenu.Link>
                ))}
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item value='get-involved'>
              <NavigationMenu.Trigger className='group flex cursor-pointer items-center gap-1'>
                Get Involved
                {chevronSvg}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                {getInvolvedItems.map((item) => (
                  <NavigationMenu.Link
                    key={item.href}
                    render={<Link href={item.href} />}
                    closeOnClick
                    className='block px-4 py-2 hover:bg-gray-100'
                  >
                    {item.label}
                  </NavigationMenu.Link>
                ))}
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link
                render={
                  <a
                    href='https://www.bonfire.com/store/hackforimpact'
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                Shop
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <a
            href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center bg-green-300 px-3 py-1.5 font-mono text-sm font-medium text-black transition-colors hover:bg-green-400 active:bg-green-500'
          >
            Donate
          </a>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner className='z-50' sideOffset={8}>
              <NavigationMenu.Popup className='min-w-[150px] bg-[#FCF9F2] py-2 text-base shadow-lg'>
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

        <button
          type='button'
          className='font-sans text-base md:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label='Toggle navigation menu'
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className='px-8 pb-8 md:hidden'>
          <div className='divide-y divide-gray-200'>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className='block py-4 text-xl focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none'
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Collapsible.Root>
              <Collapsible.Trigger className='group flex w-full items-center justify-between py-4 text-xl'>
                Work
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 12 12'
                  fill='none'
                  className='transition-transform group-data-[panel-open]:rotate-180'
                >
                  <path
                    d='M3 4.5L6 7.5L9 4.5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Collapsible.Trigger>
              <Collapsible.Panel>
                {workItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='block py-3 pl-4 text-lg'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </Collapsible.Panel>
            </Collapsible.Root>

            <Collapsible.Root>
              <Collapsible.Trigger className='group flex w-full items-center justify-between py-4 text-xl'>
                Get Involved
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 12 12'
                  fill='none'
                  className='transition-transform group-data-[panel-open]:rotate-180'
                >
                  <path
                    d='M3 4.5L6 7.5L9 4.5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </Collapsible.Trigger>
              <Collapsible.Panel>
                {getInvolvedItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='block py-3 pl-4 text-lg'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </Collapsible.Panel>
            </Collapsible.Root>

            <Link
              href='https://www.bonfire.com/company/hackforimpact'
              target='_blank'
              rel='noopener noreferrer'
              className='block py-4 text-xl'
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <a
              href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
              target='_blank'
              rel='noopener noreferrer'
              className='mt-4 block w-full bg-green-300 py-3 text-center font-mono text-lg font-medium text-black transition-colors hover:bg-green-400 active:bg-green-500'
            >
              Donate
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
