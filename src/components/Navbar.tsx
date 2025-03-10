'use client';

import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/components/Navbar.module.scss';
import Hover from '@/components/Hover';

import useHasScrolledDown from '@/utils/useHasScrolledDown';

export default function Navbar() {

  const pathname = usePathname();
  const [mobileNavOpened, setMobileNavOpened] = useState(false);

  const links = [
    { href: '/about', label: 'About Us' },
    { href: '/work', label: 'Our Work' },
    { href: '/apply', label: 'Apply' }
  ]

  const toggleMobileNav = () => setMobileNavOpened(!mobileNavOpened);

  useEffect(() => {
    setMobileNavOpened(false);
  }, [pathname])

  useEffect(() => {
    const escapeKeyListener = (event: KeyboardEvent) =>
      event.key === 'Escape' && setMobileNavOpened(false);

    document.addEventListener('keypress', escapeKeyListener);
    return () => document.removeEventListener('keypress', escapeKeyListener)
  }, [])

  const hasScrolledDown = useHasScrolledDown();

  return (
    <header className={classNames(
      styles.header,
      {
        [styles.with_background]: hasScrolledDown,
      }
    )}>
      <nav className={classNames(
        styles.nav,
        {
          [styles.nav_toggled]: mobileNavOpened,
        }
      )}>
        <Link href={'/'} className={styles.logo_link}>
          <Image width={275} height={53} src='/logo.svg' alt='Hack4Impact logo' />
        </Link>

        <button
          className={classNames(
            styles.mobile_dropdown_toggle,
            {
              [styles.toggled]: mobileNavOpened,
            }
          )} onClick={toggleMobileNav}>
          <span className={styles.stripe_top}></span>
          <span className={styles.stripe_middle}></span>
          <span className={styles.stripe_bottom}></span>
        </button>
        <div className={styles.dropdown_container}>
          {links.map(({ href, label }) =>
            <Link key={href} href={href} className={pathname === href ? styles.active : ''}>
              {label}
              <Hover color="#001aff" />
            </Link>
          )}
          <Link href='mailto:contact@hack4impact.org'>
            Contact Us
            <Hover color="#001aff" />
          </Link>
          <Link href='https://opencollective.com/Hack4Impact' className={styles.donate_button}>
            Donate
            <Hover />
          </Link>
        </div>
      </nav>
    </header >
  );
};
