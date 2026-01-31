import { type ReactNode } from "react";

interface TeamTableProps {
  heading: string;
  columns: string[];
  members: { cells: { text: string | ReactNode; href?: string; className?: string }[] }[];
  id?: string;
  className?: string;
}

const gridColsMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function TeamTable({
  heading,
  columns,
  members,
  id,
  className = "",
}: TeamTableProps) {
  const gridCols = gridColsMap[columns.length] ?? "grid-cols-3";

  return (
    <div id={id} className={`${id ? "scroll-mt-8" : ""} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-sans mb-8">{heading}</h2>
      <div className="divide-y divide-gray-200">
        <div className={`grid ${gridCols} py-3 font-mono text-sm text-gray-500`}>
          {columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>
        {members.map((member, idx) => (
          <div key={idx} className={`grid ${gridCols} py-4`}>
            {member.cells.map((cell, i) =>
              cell.href ? (
                <a
                  key={i}
                  href={cell.href}
                  target={cell.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={cell.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={cell.className ?? "font-serif text-gray-600 hover:text-gray-900"}
                >
                  {cell.text}
                </a>
              ) : (
                <span
                  key={i}
                  className={cell.className ?? (i === 0 ? "font-sans" : "font-serif text-gray-600")}
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
