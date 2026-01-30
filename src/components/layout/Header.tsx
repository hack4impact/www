"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "@base-ui/react/menu";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

const workItems = [
  { label: "Chapters", href: "/chapters" },
  { label: "Projects", href: "/projects" },
  { label: "Partners", href: "/partners" },
];

const getInvolvedItems = [
  { label: "Nonprofit", href: "/nonprofits" },
  { label: "Student", href: "/students" },
  { label: "Mentor", href: "/mentors" },
  { label: "Sponsor", href: "/sponsors" },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <Menu.Root>
      <Menu.Trigger
        openOnHover
        delay={0}
        className="flex items-center gap-1 cursor-pointer"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50" sideOffset={8}>
          <Menu.Popup className="bg-[#FCF9F2] border shadow-lg min-w-[150px] py-2">
            {items.map((item) => (
              <Menu.Item
                key={item.href}
                className="block px-4 py-2 hover:bg-gray-50 cursor-pointer"
                render={<Link href={item.href} />}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between p-4 border-b">
        <Link href="/">
          <Image
            src="/logomark.svg"
            alt="Hack4Impact"
            width={32}
            height={32}
            className="md:hidden"
          />
          <Image
            src="/logo.svg"
            alt="Hack4Impact"
            width={150}
            height={40}
            className="hidden md:block"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}

          <NavDropdown label="Work" items={workItems} />
          <NavDropdown label="Get Involved" items={getInvolvedItems} />
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "Close" : "Menu"}
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
          <div className="py-2 font-semibold">Work</div>
          {workItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="py-2 font-semibold">Get Involved</div>
          {getInvolvedItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 pl-4"
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
