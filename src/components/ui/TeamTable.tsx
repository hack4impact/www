interface TeamTableProps {
  heading: string;
  columns: string[];
  members: { cells: { text: string; href?: string }[] }[];
  id?: string;
  className?: string;
}

export function TeamTable({
  heading,
  columns,
  members,
  id,
  className = "",
}: TeamTableProps) {
  return (
    <div id={id} className={`${id ? "scroll-mt-8" : ""} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-sans mb-8">{heading}</h2>
      <div className="divide-y divide-gray-200">
        <div className="grid grid-cols-3 py-3 font-mono text-sm text-gray-500">
          {columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>
        {members.map((member) => (
          <div key={member.cells[0].text} className="grid grid-cols-3 py-4">
            {member.cells.map((cell, i) =>
              cell.href ? (
                <a
                  key={i}
                  href={cell.href}
                  target={cell.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={cell.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="font-serif text-gray-600 hover:text-gray-900"
                >
                  {cell.text}
                </a>
              ) : (
                <span
                  key={i}
                  className={i === 0 ? "font-sans" : "font-serif text-gray-600"}
                >
                  {cell.text}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
