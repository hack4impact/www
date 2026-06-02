'use client'

import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Collapsible } from '@base-ui/react/collapsible'

type DropdownKey = 'Work' | 'Get Involved'

const dropdowns: Record<DropdownKey, { label: string; href: string }[]> = {
  Work: [
    { label: 'Chapters', href: '/work/chapters' },
    { label: 'Projects', href: '/work/projects' },
    { label: 'Partners', href: '/work/partners' },
  ],
  'Get Involved': [
    { label: 'Nonprofits', href: '/get-involved/nonprofits' },
    { label: 'Students', href: '/get-involved/students' },
    { label: 'Mentors', href: '/get-involved/mentors' },
    { label: 'Sponsors', href: '/get-involved/sponsors' },
  ],
}

const dropdownKeys = Object.keys(dropdowns) as DropdownKey[]

interface HoverRect {
  x: number
  y: number
  width: number
  height: number
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <path
        d='M3 4.5L6 7.5L9 4.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </motion.svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null)
  const [hoverRect, setHoverRect] = useState<HoverRect | null>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleNavEnter = (e: React.MouseEvent<HTMLElement>, key?: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (navItemsRef.current) {
      const itemRect = e.currentTarget.getBoundingClientRect()
      const containerRect = navItemsRef.current.getBoundingClientRect()
      setHoverRect({
        x: itemRect.left - containerRect.left,
        y: itemRect.top - containerRect.top,
        width: itemRect.width,
        height: itemRect.height,
      })
    }
    setOpenDropdown(key ?? null)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      setHoverRect(null)
    }, 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <header>
      <nav className='flex h-16 items-center justify-between px-8 md:px-16'>
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

        {/* Desktop nav */}
        <div className='hidden items-center gap-6 md:flex'>
          <div
            ref={navItemsRef}
            className='relative flex items-center'
            onMouseLeave={scheduleClose}
          >
            {/* Sliding hover highlight */}
            <AnimatePresence>
              {hoverRect && (
                <motion.div
                  className='pointer-events-none absolute left-0 top-0 rounded-md bg-black/[0.06]'
                  initial={{
                    opacity: 0,
                    x: hoverRect.x,
                    y: hoverRect.y,
                    width: hoverRect.width,
                    height: hoverRect.height,
                  }}
                  animate={{
                    opacity: 1,
                    x: hoverRect.x,
                    y: hoverRect.y,
                    width: hoverRect.width,
                    height: hoverRect.height,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </AnimatePresence>

            {/* About */}
            <Link
              href='/about'
              className='relative z-10 px-3 py-1.5 font-sans text-[15px] text-black'
              onMouseEnter={(e) => handleNavEnter(e)}
            >
              About
            </Link>

            {/* Dropdown triggers */}
            {dropdownKeys.map((key) => (
              <div key={key} className='relative'>
                <button
                  type='button'
                  className='relative z-10 flex cursor-pointer items-center gap-1.5 px-3 py-1.5 font-sans text-[15px] text-black'
                  onMouseEnter={(e) => handleNavEnter(e, key)}
                >
                  {key}
                  <ChevronIcon isOpen={openDropdown === key} />
                </button>

                <AnimatePresence>
                  {openDropdown === key && (
                    <motion.div
                      className='absolute top-full left-0 z-50 mt-2 min-w-[160px] overflow-hidden rounded-[3px] border border-black/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className='py-1'>
                        {dropdowns[key].map((item, i) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.04 }}
                          >
                            <Link
                              href={item.href}
                              className='block px-4 py-2 font-sans text-[14px] text-black transition-colors hover:bg-black/5'
                              onClick={() => {
                                setOpenDropdown(null)
                                setHoverRect(null)
                              }}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <a
            href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-[3px] bg-blue-500 px-5 py-2 font-mono text-[11px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600'
          >
            Donate
          </a>
        </div>

        {/* Mobile toggle */}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='px-8 pb-8 md:hidden'
          >
            <div className='divide-y divide-black/10'>
              <Link
                href='/about'
                aria-current={pathname === '/about' ? 'page' : undefined}
                className='block py-4 font-sans text-xl'
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {dropdownKeys.map((key) => (
                <Collapsible.Root key={key}>
                  <Collapsible.Trigger className='group flex w-full items-center justify-between py-4 font-sans text-xl'>
                    {key}
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
                    {dropdowns[key].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className='block py-3 pl-4 font-sans text-lg text-black/70'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Collapsible.Panel>
                </Collapsible.Root>
              ))}

              <a
                href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 block w-full rounded-[3px] bg-blue-500 py-3 text-center font-mono text-[13px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600'
              >
                Donate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
