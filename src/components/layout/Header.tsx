'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from '@base-ui/react/menu'

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
  { label: 'Non-Profit', href: '/get-involved/nonprofits' },
  { label: 'Student', href: '/get-involved/students' },
  { label: 'Mentor', href: '/get-involved/mentors' },
  { label: 'Sponsor', href: '/get-involved/sponsors' },
]

function NavDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  return (
    <Menu.Root>
      <Menu.Trigger
        openOnHover
        delay={0}
        className='flex items-center gap-1 cursor-pointer text-base'
      >
        {label}
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
          <path
            d='M3 4.5L6 7.5L9 4.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className='z-50' sideOffset={8}>
          <Menu.Popup className='bg-[#FCF9F2] shadow-lg min-w-[150px] py-2 text-base'>
            {items.map((item) => (
              <Menu.Item
                key={item.href}
                className='block px-4 py-2 hover:bg-gray-50 cursor-pointer'
                render={<Link href={item.href} />}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const [getInvolvedOpen, setGetInvolvedOpen] = useState(false)

  return (
    <header className={`${mobileMenuOpen ? 'bg-[#FCF9F2]' : ''}`}>
      <nav className='flex items-center justify-between px-8 md:px-12 py-4 text-base'>
        <Link href='/'>
          <Image
            src='/logomark.svg'
            alt='Hack4Impact'
            width={32}
            height={32}
            className='md:hidden brightness-0'
          />
          <Image
            src='/logo.svg'
            alt='Hack4Impact'
            width={150}
            height={40}
            className='hidden md:block'
          />
        </Link>

        <div className='hidden md:flex items-center gap-6 text-base'>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}

          <NavDropdown label='Work' items={workItems} />
          <NavDropdown label='Get Involved' items={getInvolvedItems} />
        </div>

        <button
          type='button'
          className='md:hidden text-base font-sans'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label='Toggle navigation menu'
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className='md:hidden px-8 pb-8'>
          <div className='divide-y divide-gray-200'>
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='block py-4 text-xl'
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div>
              <button
                type='button'
                className='flex w-full items-center justify-between py-4 text-xl font-semibold'
                onClick={() => setWorkOpen(!workOpen)}
                aria-expanded={workOpen}
              >
                Work
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 12 12'
                  fill='none'
                  className={`transition-transform ${workOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    d='M3 4.5L6 7.5L9 4.5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              {workOpen &&
                workItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='block py-3 pl-4 text-lg'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
            <div>
              <button
                type='button'
                className='flex w-full items-center justify-between py-4 text-xl font-semibold'
                onClick={() => setGetInvolvedOpen(!getInvolvedOpen)}
                aria-expanded={getInvolvedOpen}
              >
                Get Involved
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 12 12'
                  fill='none'
                  className={`transition-transform ${getInvolvedOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    d='M3 4.5L6 7.5L9 4.5'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              {getInvolvedOpen &&
                getInvolvedItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className='block py-3 pl-4 text-lg'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
