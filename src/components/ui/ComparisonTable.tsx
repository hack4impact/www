import { Check } from 'iconoir-react'

export interface ComparisonColumn {
  label: string
  meta?: string
}

export interface ComparisonRow {
  label: string
  values: boolean[]
}

interface ComparisonTableProps {
  heading?: string
  labelHeader?: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}

export function ComparisonTable({ heading, labelHeader, columns, rows }: ComparisonTableProps) {
  const gridStyle = { gridTemplateColumns: `repeat(${columns.length + 1}, minmax(0, 1fr))` }

  return (
    <>
      {heading && (
        <h2 className='mb-8 text-center font-serif text-[40px] leading-[48px] font-light tracking-[-0.01em] text-black'>
          {heading}
        </h2>
      )}

      {/* Desktop comparison table */}
      <div className='hidden md:block'>
        <div className='divide-y divide-gray-200'>
          {/* Column headers */}
          <div className='grid py-3' style={gridStyle}>
            <span className='label-xs text-gray-400'>{labelHeader ?? ''}</span>
            {columns.map((col) => (
              <div key={col.label} className='flex flex-col items-center gap-1'>
                <span className='label-xs text-gray-500'>{col.label}</span>
                {col.meta && <span className='font-serif text-sm text-gray-600'>{col.meta}</span>}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div key={row.label} className='grid items-center py-4' style={gridStyle}>
              <span className='font-sans text-sm text-gray-900'>{row.label}</span>
              {row.values.map((checked, i) => (
                <div key={i} className='flex items-center justify-center'>
                  {checked && <Check width={16} height={16} strokeWidth={2} className='text-blue-500' />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked column cards */}
      <div className='divide-y divide-gray-200 md:hidden'>
        {columns.map((col, ci) => (
          <div key={col.label} className='py-6'>
            <div className='flex items-baseline justify-between gap-4'>
              <span className='label-xs text-gray-500'>{col.label}</span>
              {col.meta && <span className='font-serif text-sm text-gray-600'>{col.meta}</span>}
            </div>
            <ul className='mt-4 space-y-2'>
              {rows.filter((row) => row.values[ci]).map((row) => (
                <li key={row.label} className='flex items-start gap-2'>
                  <Check width={16} height={16} strokeWidth={2} className='mt-0.5 shrink-0 text-blue-500' />
                  <span className='font-sans text-sm text-gray-900'>{row.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
