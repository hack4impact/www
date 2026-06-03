'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Collapsible } from '@base-ui/react/collapsible'
import { FilterSelect } from './FilterSelect'
import { ProjectCard } from './ProjectCard'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import type { Project } from '@/lib/types/project'

const gridVariants = staggerContainer(0.04)
const itemVariants = fadeInUp(0.4)

type Sort = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc'

const SORT_OPTIONS = [
  { value: 'year-desc', label: 'Newest first' },
  { value: 'year-asc', label: 'Oldest first' },
  { value: 'name-asc', label: 'A–Z' },
  { value: 'name-desc', label: 'Z–A' },
]

interface ProjectsTableProps {
  projects: Project[]
  hideChapterFilter?: boolean
}

export function ProjectsTable({ projects, hideChapterFilter = false }: ProjectsTableProps) {
  const [focusArea, setFocusArea] = useState('all')
  const [chapter, setChapter] = useState('all')
  const [year, setYear] = useState('all')
  const [sort, setSort] = useState<Sort>('year-desc')

  const focusAreaOptions = useMemo(() => {
    const tags = new Set<string>()
    let hasNone = false
    for (const p of projects) {
      if (p.tag) tags.add(p.tag)
      else hasNone = true
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(tags)
        .sort()
        .map((t) => ({ value: t, label: t })),
      ...(hasNone ? [{ value: '__none__', label: 'None' }] : []),
    ]
  }, [projects])

  const chapterOptions = useMemo(() => {
    const chapters = new Set<string>()
    let hasNone = false
    for (const p of projects) {
      if (p.chapter) chapters.add(p.chapter)
      else hasNone = true
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(chapters)
        .sort()
        .map((c) => ({ value: c, label: c })),
      ...(hasNone ? [{ value: '__none__', label: 'None' }] : []),
    ]
  }, [projects])

  const yearOptions = useMemo(() => {
    const years = new Set<string>()
    let hasNone = false
    for (const p of projects) {
      if (p.year) years.add(p.year)
      else hasNone = true
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(years)
        .sort((a, b) => b.localeCompare(a))
        .map((y) => ({ value: y, label: y })),
      ...(hasNone ? [{ value: '__none__', label: 'None' }] : []),
    ]
  }, [projects])

  const filtered = useMemo(() => {
    let list = [...projects]
    if (focusArea === '__none__') list = list.filter((p) => !p.tag)
    else if (focusArea !== 'all') list = list.filter((p) => p.tag === focusArea)
    if (chapter === '__none__') list = list.filter((p) => !p.chapter)
    else if (chapter !== 'all') list = list.filter((p) => p.chapter === chapter)
    if (year === '__none__') list = list.filter((p) => !p.year)
    else if (year !== 'all') list = list.filter((p) => p.year === year)

    list.sort((a, b) => {
      if (sort === 'year-desc') {
        if (!a.year && !b.year) return a.title.localeCompare(b.title)
        if (!a.year) return 1
        if (!b.year) return -1
        const diff = b.year.localeCompare(a.year)
        return diff !== 0 ? diff : a.title.localeCompare(b.title)
      }
      if (sort === 'year-asc') {
        if (!a.year && !b.year) return a.title.localeCompare(b.title)
        if (!a.year) return 1
        if (!b.year) return -1
        const diff = a.year.localeCompare(b.year)
        return diff !== 0 ? diff : a.title.localeCompare(b.title)
      }
      if (sort === 'name-asc') return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title)
    })

    return list
  }, [projects, focusArea, chapter, year, sort])

  return (
    <div>
      {/* Desktop filters */}
      <div className='hidden items-center gap-2 border-b border-border-subtle pb-5 md:flex'>
        <FilterSelect label='Focus Area' value={focusArea} onValueChange={setFocusArea} options={focusAreaOptions} />
        {!hideChapterFilter && (
          <FilterSelect label='Chapter' value={chapter} onValueChange={setChapter} options={chapterOptions} />
        )}
        <FilterSelect label='Year' value={year} onValueChange={setYear} options={yearOptions} />
        <div className='ml-auto'>
          <FilterSelect label='Sort' value={sort} onValueChange={(v) => setSort(v as Sort)} options={SORT_OPTIONS} align='end' />
        </div>
      </div>

      {/* Mobile filters */}
      <div className='border-b border-border-subtle pb-5 md:hidden'>
        <Collapsible.Root>
          <div className='flex items-center justify-between'>
            <Collapsible.Trigger className='group flex cursor-pointer items-center gap-2 rounded-[6px] border border-gray-300 px-3.5 py-2 font-mono text-[10px] tracking-[0.06em] uppercase text-gray-600 outline-none transition-colors hover:border-gray-400'>
              Filters
              <svg width='10' height='10' viewBox='0 0 12 12' fill='none' className='transition-transform duration-200 group-data-[panel-open]:rotate-180'>
                <path d='M3 4.5L6 7.5L9 4.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </Collapsible.Trigger>
            <FilterSelect label='Sort' value={sort} onValueChange={(v) => setSort(v as Sort)} options={SORT_OPTIONS} align='end' />
          </div>
          <Collapsible.Panel className='overflow-hidden [height:var(--collapsible-panel-height,0px)] [transition:height_0.24s_cubic-bezier(0.16,1,0.3,1)]'>
            <div className='grid grid-cols-2 gap-2 pt-3'>
              <FilterSelect label='Focus Area' value={focusArea} onValueChange={setFocusArea} options={focusAreaOptions} />
              {!hideChapterFilter && (
                <FilterSelect label='Chapter' value={chapter} onValueChange={setChapter} options={chapterOptions} />
              )}
              <FilterSelect label='Year' value={year} onValueChange={setYear} options={yearOptions} />
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>

      <motion.div
        key={`${focusArea}|${chapter}|${year}|${sort}`}
        variants={gridVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className='mt-6 max-h-[72vh] overflow-y-auto pr-1'>
          <div className='grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
            {filtered.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className='mt-16 text-center font-sans text-base text-gray-400'>
              No projects match the selected filters.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
