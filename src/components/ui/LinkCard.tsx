interface LinkCardProps {
  label: string;
  href: string;
  className?: string;
}

export function LinkCard({ label, href, className = "" }: LinkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors ${className}`}
    >
      <p className="font-sans text-base mb-1">{label}</p>
      <p className="font-serif text-gray-500 text-sm truncate">{href}</p>
    </a>
  );
}
