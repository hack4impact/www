'use client'

import { useState, useMemo } from 'react'
import { FilterSelect } from './FilterSelect'
import { ChapterCard } from './ChapterCard'
import type { Chapter } from '@/lib/types/chapter'

type Sort = 'status' | 'name-asc' | 'name-desc' | 'year-asc' | 'year-desc'

const STATUS_ORDER: Record<string, number> = {
  Active: 0,
  Forming: 1,
  Inactive: 2,
}

function statusPriority(status: string): number {
  return STATUS_ORDER[status] ?? 3
}

const SORT_OPTIONS = [
  { value: 'status', label: 'Active first' },
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

export function ChaptersTable({ chapters, images }: ChaptersTableProps) {
  const [status, setStatus] = useState('all')
  const [region, setRegion] = useState('all')
  const [est, setEst] = useState('all')
  const [sort, setSort] = useState<Sort>('status')

  const statusOptions = useMemo(() => {
    const statuses = new Set<string>()
    for (const c of chapters) {
      if (c.status) statuses.add(c.status)
    }
    const sorted = Array.from(statuses).sort(
      (a, b) => statusPriority(a) - statusPriority(b),
    )
    return [
      { value: 'all', label: 'All' },
      ...sorted.map((s) => ({ value: s, label: s })),
    ]
  }, [chapters])

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
    if (status !== 'all') list = list.filter((c) => c.status === status)
    if (region !== 'all') list = list.filter((c) => parseState(c.location ?? '') === region)
    if (est !== 'all') list = list.filter((c) => c.founded === est)

    list.sort((a, b) => {
      if (sort === 'status') {
        const diff = statusPriority(a.status) - statusPriority(b.status)
        return diff !== 0 ? diff : a.name.localeCompare(b.name)
      }
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      const nullFallback = sort === 'year-asc' ? '9999' : '0000'
      const aYear = a.founded ?? nullFallback
      const bYear = b.founded ?? nullFallback
      return sort === 'year-asc' ? aYear.localeCompare(bYear) : bYear.localeCompare(aYear)
    })

    return list
  }, [chapters, status, region, est, sort])

  return (
    <div>
      <div className='flex items-center gap-2 border-b border-[#E8E8E4] pb-5'>
        <FilterSelect
          label='Status'
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
        />
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
