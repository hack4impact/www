import { type ReactNode } from 'react'

interface GridTableRow {
  cells: { text: string | ReactNode; href?: string; className?: string }[]
}

interface GridTableProps {
  heading: string
  headingClassName?: string
  columns: string[]
  rows: GridTableRow[]
  id?: string
  className?: string
  /** Center all columns after the first (useful for checkmark grids) */
  centerAfterFirst?: boolean
}

// Static map — Tailwind purges dynamic class names
const gridColsMap: Record<number, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
}

export function GridTable({
  heading,
  headingClassName = '',
  columns,
  rows,
  id,
  className = '',
  centerAfterFirst = false,
}: GridTableProps) {
  const gridCols = gridColsMap[columns.length] ?? 'md:grid-cols-3'

  return (
    <div id={id} className={`${id ? 'scroll-mt-8' : ''} ${className}`}>
      <h2 className={`text-2xl md:text-3xl font-sans mb-8 ${headingClassName}`}>
        {heading}
      </h2>
      <div className='divide-y divide-gray-200'>
        {/* Column headers — hidden on mobile, visible as grid on md+ */}
        <div
          className={`hidden md:grid ${gridCols} py-3 font-mono text-sm text-gray-500`}
        >
          {columns.map((col, i) => (
            <span
              key={col}
              className={centerAfterFirst && i > 0 ? 'text-center' : ''}
            >
              {col}
            </span>
          ))}
        </div>

        {rows.map((row, idx) => (
          <div key={idx} className={`grid ${gridCols} ${centerAfterFirst ? 'items-center' : ''} gap-1 md:gap-0 py-4`}>
            {row.cells.map((cell, i) => {
              const centered =
                centerAfterFirst && i > 0
                  ? 'text-center flex items-center justify-center'
                  : ''

              // On mobile stacked layout, secondary cells render smaller
              const mobileSecondary = i > 0 ? 'md:text-base text-sm' : ''

              const defaultClass =
                i === 0 ? 'font-sans text-gray-900' : 'font-serif text-gray-600'

              return cell.href ? (
                <a
                  key={i}
                  href={cell.href}
                  target={
                    cell.href.startsWith('mailto:') ? undefined : '_blank'
                  }
                  rel={
                    cell.href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className={`${cell.className ?? `${defaultClass} hover:text-gray-900`} ${centered} ${mobileSecondary}`}
                >
                  {cell.text}
                </a>
              ) : (
                <span
                  key={i}
                  className={`${cell.className ?? defaultClass} ${centered} ${mobileSecondary}`}
                >
                  {cell.text}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
