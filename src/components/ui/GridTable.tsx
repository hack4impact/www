import { type ReactNode } from "react";

interface GridTableRow {
  cells: { text: string | ReactNode; href?: string; className?: string }[];
}

interface GridTableProps {
  heading: string;
  headingClassName?: string;
  columns: string[];
  rows: GridTableRow[];
  id?: string;
  className?: string;
  /** Center all columns after the first (useful for checkmark grids) */
  centerAfterFirst?: boolean;
}

// Static map — Tailwind purges dynamic class names
const gridColsMap: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function GridTable({
  heading,
  headingClassName = "",
  columns,
  rows,
  id,
  className = "",
  centerAfterFirst = false,
}: GridTableProps) {
  const gridCols = gridColsMap[columns.length] ?? "grid-cols-3";

  return (
    <div id={id} className={`${id ? "scroll-mt-8" : ""} ${className}`}>
      <h2 className={`text-2xl md:text-3xl font-sans mb-8 ${headingClassName}`}>
        {heading}
      </h2>
      <div className="divide-y divide-gray-200">
        <div className={`grid ${gridCols} py-3 font-mono text-sm text-gray-500`}>
          {columns.map((col, i) => (
            <span key={col} className={centerAfterFirst && i > 0 ? "text-center" : ""}>
              {col}
            </span>
          ))}
        </div>
        {rows.map((row, idx) => (
          <div key={idx} className={`grid ${gridCols} py-4`}>
            {row.cells.map((cell, i) => {
              const centered = centerAfterFirst && i > 0 ? "text-center flex justify-center" : "";
              return cell.href ? (
                <a
                  key={i}
                  href={cell.href}
                  target={cell.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={cell.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={`${cell.className ?? "font-serif text-gray-600 hover:text-gray-900"} ${centered}`}
                >
                  {cell.text}
                </a>
              ) : (
                <span
                  key={i}
                  className={`${cell.className ?? (i === 0 ? "font-sans" : "font-serif text-gray-600")} ${centered}`}
                >
                  {cell.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
