'use client'

import { useState, useMemo } from 'react'
import { FilterSelect } from './FilterSelect'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/lib/types/project'

type Sort = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc'

const SORT_OPTIONS = [
  { value: 'year-desc', label: 'Newest first' },
  { value: 'year-asc', label: 'Oldest first' },
  { value: 'name-asc', label: 'A–Z' },
  { value: 'name-desc', label: 'Z–A' },
]

interface ProjectsTableProps {
  projects: Project[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [focusArea, setFocusArea] = useState('all')
  const [chapter, setChapter] = useState('all')
  const [year, setYear] = useState('all')
  const [sort, setSort] = useState<Sort>('year-desc')

  const focusAreaOptions = useMemo(() => {
    const tags = new Set<string>()
    for (const p of projects) {
      if (p.tag) tags.add(p.tag)
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(tags)
        .sort()
        .map((t) => ({ value: t, label: t })),
    ]
  }, [projects])

  const chapterOptions = useMemo(() => {
    const chapters = new Set<string>()
    for (const p of projects) {
      if (p.chapter) chapters.add(p.chapter)
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(chapters)
        .sort()
        .map((c) => ({ value: c, label: c })),
    ]
  }, [projects])

  const yearOptions = useMemo(() => {
    const years = new Set<string>()
    for (const p of projects) {
      if (p.year) years.add(p.year)
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(years)
        .sort((a, b) => b.localeCompare(a))
        .map((y) => ({ value: y, label: y })),
    ]
  }, [projects])

  const filtered = useMemo(() => {
    let list = [...projects]
    if (focusArea !== 'all') list = list.filter((p) => p.tag === focusArea)
    if (chapter !== 'all') list = list.filter((p) => p.chapter === chapter)
    if (year !== 'all') list = list.filter((p) => p.year === year)

    list.sort((a, b) => {
      if (sort === 'year-desc') {
        const diff = (b.year ?? '').localeCompare(a.year ?? '')
        return diff !== 0 ? diff : a.title.localeCompare(b.title)
      }
      if (sort === 'year-asc') {
        const diff = (a.year ?? '').localeCompare(b.year ?? '')
        return diff !== 0 ? diff : a.title.localeCompare(b.title)
      }
      if (sort === 'name-asc') return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title)
    })

    return list
  }, [projects, focusArea, chapter, year, sort])

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2 border-b border-[#E8E8E4] pb-5'>
        <FilterSelect
          label='Focus Area'
          value={focusArea}
          onValueChange={setFocusArea}
          options={focusAreaOptions}
        />
        <FilterSelect
          label='Chapter'
          value={chapter}
          onValueChange={setChapter}
          options={chapterOptions}
        />
        <FilterSelect
          label='Year'
          value={year}
          onValueChange={setYear}
          options={yearOptions}
        />
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
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} colorIndex={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className='mt-16 text-center font-sans text-base text-gray-400'>
          No projects match the selected filters.
        </p>
      )}
    </div>
  )
}
