'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { label: 'About', href: '/about' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Projects', href: '/projects' },
  { label: 'Partners', href: '/partners' },
  { label: 'Journal', href: '/journal' },
  { label: 'Get Involved', href: '/get-involved' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between p-4 border-b">
        <Link href="/">
          <Image src="/logomark.svg" alt="Hack4Impact" width={32} height={32} className="md:hidden" />
          <Image src="/logo.svg" alt="Hack4Impact" width={150} height={40} className="hidden md:block" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden p-4 border-b">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
