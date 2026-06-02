'use client'

import { useState, useMemo } from 'react'
import { Select } from '@base-ui/react/select'
import { ChapterCard } from './ChapterCard'
import type { Chapter } from '@/lib/types/chapter'
import { cn } from '@/lib/utils'

type Sort = 'name-asc' | 'name-desc' | 'year-asc' | 'year-desc'

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'A–Z' },
  { value: 'name-desc', label: 'Z–A' },
  { value: 'year-asc', label: 'Year ↑' },
  { value: 'year-desc', label: 'Year ↓' },
]

interface ChaptersTableProps {
  chapters: Chapter[]
  images: Record<string, string | null>
}

function parseState(location: string): string {
  const parts = location.split(', ')
  return parts.length >= 2 ? parts[parts.length - 1] : ''
}

function FilterSelect({
  label,
  value,
  onValueChange,
  options,
  align = 'start',
}: {
  label: string
  value: string
  onValueChange: (v: string) => void
  options: { value: string; label: string }[]
  align?: 'start' | 'end'
}) {
  return (
    <Select.Root value={value} onValueChange={(v) => onValueChange(v ?? 'all')}>
      <Select.Trigger className='flex cursor-pointer items-center gap-2 rounded-[6px] border border-gray-300 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors hover:border-gray-400 focus:outline-none'>
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
              'overflow-hidden rounded-lg border border-black/[0.07] bg-[#ffffff] py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.07)]',
            )}
          >
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'relative flex cursor-pointer items-center px-4 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-black outline-none',
                  'data-[highlighted]:bg-black/[0.06]',
                  'data-[selected]:text-blue-500',
                )}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}

export function ChaptersTable({ chapters, images }: ChaptersTableProps) {
  const [region, setRegion] = useState('all')
  const [est, setEst] = useState('all')
  const [sort, setSort] = useState<Sort>('name-asc')

  const regionOptions = useMemo(() => {
    const states = new Set<string>()
    for (const c of chapters) {
      const s = parseState(c.location ?? '')
      if (s) states.add(s)
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(states)
        .sort()
        .map((s) => ({ value: s, label: s })),
    ]
  }, [chapters])

  const estOptions = useMemo(() => {
    const years = new Set<string>()
    for (const c of chapters) {
      if (c.founded) years.add(c.founded)
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(years)
        .sort()
        .map((y) => ({ value: y, label: y })),
    ]
  }, [chapters])

  const filtered = useMemo(() => {
    let list = [...chapters]
    if (region !== 'all') list = list.filter((c) => parseState(c.location ?? '') === region)
    if (est !== 'all') list = list.filter((c) => c.founded === est)

    list.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      const nullFallback = sort === 'year-asc' ? '9999' : '0000'
      const aYear = a.founded ?? nullFallback
      const bYear = b.founded ?? nullFallback
      return sort === 'year-asc' ? aYear.localeCompare(bYear) : bYear.localeCompare(aYear)
    })

    return list
  }, [chapters, region, est, sort])

  return (
    <div>
      <div className='flex items-center gap-2 border-b border-[#E8E8E4] pb-5'>
        <FilterSelect
          label='Region'
          value={region}
          onValueChange={setRegion}
          options={regionOptions}
        />
        <FilterSelect label='Est.' value={est} onValueChange={setEst} options={estOptions} />
        <div className='ml-auto'>
          <FilterSelect
            label='Sort'
            value={sort}
            onValueChange={(v) => setSort(v as Sort)}
            options={SORT_OPTIONS}
            align='end'
          />
        </div>
      </div>

      <div className='mt-10 grid grid-cols-2 gap-3 md:grid-cols-4'>
        {filtered.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            imageUrl={images[chapter.slug] ?? null}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className='mt-16 text-center font-sans text-base text-gray-400'>
          No chapters match the selected filters.
        </p>
      )}
    </div>
  )
}
