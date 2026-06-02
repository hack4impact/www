'use client'

import { Select } from '@base-ui/react/select'
import { cn } from '@/lib/utils'

interface FilterSelectProps {
  label: string
  value: string
  onValueChange: (v: string) => void
  options: { value: string; label: string }[]
  align?: 'start' | 'end'
}

export function FilterSelect({
  label,
  value,
  onValueChange,
  options,
  align = 'start',
}: FilterSelectProps) {
  return (
    <Select.Root value={value} onValueChange={(v) => onValueChange(v ?? 'all')}>
      <Select.Trigger className='flex cursor-pointer items-center gap-2 rounded-[6px] border border-gray-300 px-3.5 py-2 font-mono text-[10px] tracking-[0.06em] uppercase transition-colors hover:border-gray-400 focus:outline-none'>
        <span className='text-gray-400'>{label}</span>
        <span className='text-gray-300'>|</span>
        <Select.Value />
        <Select.Icon className='text-gray-400'>
          <svg width='10' height='10' viewBox='0 0 12 12' fill='none'>
            <path
              d='M3 4.5L6 7.5L9 4.5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          sideOffset={6}
          align={align}
          alignItemWithTrigger={false}
          positionMethod='fixed'
          className='z-50'
        >
          <Select.Popup
            className={cn(
              'select-popup',
              'border-border-subtle overflow-hidden rounded-lg border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.07)]',
            )}
            style={{ minWidth: 'var(--anchor-width)' }}
          >
            <div className='max-h-[220px] overflow-y-auto py-1.5'>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer items-center px-4 py-2 font-mono text-[11px] tracking-[0.06em] text-black uppercase outline-none',
                    'data-[highlighted]:bg-black/[0.06]',
                    'data-[selected]:text-blue-500',
                  )}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </div>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
