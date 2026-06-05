'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Collapsible } from '@base-ui/react/collapsible'
import { Menu } from '@base-ui/react/menu'

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

type MobileItem =
  | { key: string; type: 'link'; label: string; href: string }
  | { key: string; type: 'dropdown'; label: string; dropdownKey: DropdownKey }

const mobileItems: MobileItem[] = [
  { key: 'about', type: 'link', label: 'About', href: '/about' },
  { key: 'work', type: 'dropdown', label: 'Work', dropdownKey: 'Work' },
  {
    key: 'get-involved',
    type: 'dropdown',
    label: 'Get Involved',
    dropdownKey: 'Get Involved',
  },
]

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function getRelativeRect(el: HTMLElement, container: HTMLElement): Rect {
  const a = el.getBoundingClientRect()
  const b = container.getBoundingClientRect()
  return {
    x: a.left - b.left,
    y: a.top - b.top,
    width: a.width,
    height: a.height,
  }
}

function SlideHighlight({
  rect,
  insetX = 0,
}: {
  rect: Rect | null
  insetX?: number
}) {
  const r = rect
    ? {
        x: rect.x + insetX,
        y: rect.y,
        width: rect.width - insetX * 2,
        height: rect.height,
      }
    : null
  return (
    <AnimatePresence>
      {r && (
        <motion.div
          className='pointer-events-none absolute top-0 left-0 rounded-md bg-gray-5'
          initial={{
            opacity: 0,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
          }}
          animate={{
            opacity: 1,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
          }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
    </AnimatePresence>
  )
}

function SunIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <circle cx='12' cy='12' r='4' />
      <path d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41' />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  )
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
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
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // Hover & Dropdown state
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null)
  const [navRect, setNavRect] = useState<Rect | null>(null)
  const navRowRef = useRef<HTMLDivElement>(null)
  const [dropdownRect, setDropdownRect] = useState<Rect | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      setNavRect(null)
      setDropdownRect(null)
    }, 120)
  }

  const handleNavItemEnter = (
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    key?: DropdownKey,
  ) => {
    cancelClose()
    if (navRowRef.current) {
      setNavRect(getRelativeRect(e.currentTarget, navRowRef.current))
    }
    if (key !== openDropdown) setDropdownRect(null)
    setOpenDropdown(key ?? null)
  }

  const handleDropdownItemEnter = (
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
  ) => {
    const container = e.currentTarget.parentElement
    if (container) {
      setDropdownRect(getRelativeRect(e.currentTarget, container))
    }
  }

  const closeAll = () => {
    cancelClose()
    setOpenDropdown(null)
    setNavRect(null)
    setDropdownRect(null)
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
            className='brightness-0 dark:invert md:hidden'
          />
          <Image
            src='/logo.svg'
            alt='Hack4Impact'
            width={150}
            height={40}
            className='hidden brightness-0 dark:invert md:block'
          />
        </Link>

        {/* Desktop nav */}
        <div className='hidden items-center gap-6 md:flex'>
          <div className='relative' onMouseLeave={scheduleClose}>
            {/* Nav row with sliding highlight */}
            <div ref={navRowRef} className='relative flex items-center'>
              <SlideHighlight rect={navRect} />

              <Link
                href='/about'
                onClick={closeAll}
                className='relative z-10 px-3 py-1.5 font-sans text-[15px] text-inverse outline-none'
                onMouseEnter={(e) => handleNavItemEnter(e)}
                onFocus={(e) => handleNavItemEnter(e)}
              >
                About
              </Link>

              {dropdownKeys.map((key) => (
                <Menu.Root
                  key={key}
                  open={openDropdown === key}
                  onOpenChange={(isOpen) => {
                    if (isOpen) {
                      cancelClose()
                      setOpenDropdown(key)
                    } else {
                      setOpenDropdown((prev) => (prev === key ? null : prev))
                    }
                  }}
                >
                  <Menu.Trigger
                    className='relative z-10 flex cursor-default items-center gap-1.5 px-3 py-1.5 font-sans text-[15px] text-inverse outline-none'
                    onMouseEnter={(e) => handleNavItemEnter(e, key)}
                  >
                    {key}
                    <ChevronIcon isOpen={openDropdown === key} />
                  </Menu.Trigger>

                  <Menu.Portal>
                    <Menu.Positioner
                      sideOffset={6}
                      align='start'
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <Menu.Popup
                        className='z-50 min-w-[160px] overflow-hidden rounded-lg border border-separator bg-root shadow-popup outline-none'
                        render={
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.98 }}
                            transition={{
                              duration: 0.18,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        }
                      >
                        <div
                          className='relative py-1.5'
                          onMouseLeave={() => setDropdownRect(null)}
                        >
                          <SlideHighlight rect={dropdownRect} insetX={6} />
                          {dropdowns[key].map((item) => (
                            <Menu.LinkItem
                              key={item.href}
                              render={<Link href={item.href} />}
                              closeOnClick
                              onClick={closeAll}
                              onMouseEnter={handleDropdownItemEnter}
                              onFocus={handleDropdownItemEnter}
                              className='relative z-10 block px-4 py-2 font-sans text-[15px] whitespace-nowrap text-inverse outline-none'
                            >
                              {item.label}
                            </Menu.LinkItem>
                          ))}
                        </div>
                      </Menu.Popup>
                    </Menu.Positioner>
                  </Menu.Portal>
                </Menu.Root>
              ))}
            </div>
          </div>

          <a
            href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
            target='_blank'
            rel='noopener noreferrer'
            className='rounded-md bg-blue-500 px-5 py-2 font-mono text-[13px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600'
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className='overflow-hidden md:hidden'
          >
            <div className='divide-y divide-separator px-8 pb-8'>
              {mobileItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.06 + i * 0.06,
                    duration: 0.22,
                    ease: 'easeOut',
                  }}
                >
                  {item.type === 'link' ? (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className='block py-4 font-sans text-xl'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Collapsible.Root>
                      <Collapsible.Trigger className='group flex w-full items-center justify-between py-4 font-sans text-xl outline-none'>
                        {item.label}
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 12 12'
                          fill='none'
                          className='transition-transform duration-200 group-data-[panel-open]:rotate-180'
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

                      <Collapsible.Panel
                        render={
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: 'var(--collapsible-panel-height)',
                              opacity: 1,
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.24,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        }
                        className='overflow-hidden'
                      >
                        {dropdowns[item.dropdownKey].map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className='block py-3 pl-4 font-sans text-lg text-inverse/60 outline-none'
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </Collapsible.Panel>
                    </Collapsible.Root>
                  )}{' '}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 + mobileItems.length * 0.06,
                  duration: 0.22,
                  ease: 'easeOut',
                }}
              >
                <a
                  href='https://collect.crowded.me/collection/5347b60c-26a0-45da-9c0e-4910703f3152'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 block w-full rounded-[3px] bg-blue-500 py-3 text-center font-mono text-[13px] tracking-[0.02em] text-white transition-colors hover:bg-blue-600'
                >
                  Donate
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating dark mode toggle */}
      <button
        type='button'
        onClick={toggleDark}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        className='fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-separator bg-root text-inverse shadow-lg transition-colors hover:bg-panel'
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  )
}
