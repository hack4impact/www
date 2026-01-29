import Link from 'next/link';

const footerLinks = {
  organization: [
    { label: 'About', href: '/about' },
    { label: 'Chapters', href: '/chapters' },
    { label: 'Projects', href: '/projects' },
    { label: 'Partners', href: '/partners' },
  ],
  getInvolved: [
    { label: 'Join a Chapter', href: '/get-involved#join' },
    { label: 'Start a Chapter', href: '/get-involved#start' },
    { label: 'Be a Mentor', href: '/get-involved#mentor' },
    { label: 'Partner With Us', href: '/get-involved#partner' },
  ],
  resources: [
    { label: 'Journal', href: '/journal' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-bold text-xl">
              H4I
            </Link>
            <p className="mt-2 text-sm">
              Code for the common good.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Organization</h3>
            <ul className="space-y-1">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Get Involved</h3>
            <ul className="space-y-1">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Hack4Impact</p>
        </div>
      </div>
    </footer>
  );
}
