'use client'

import { useState, useMemo } from 'react'
import { FilterSelect } from './FilterSelect'
import { PartnerCard } from './PartnerCard'
import type { Partner } from '@/lib/types/partner'

type Sort = 'name-asc' | 'name-desc' | 'projects-desc'

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'A–Z' },
  { value: 'name-desc', label: 'Z–A' },
  { value: 'projects-desc', label: 'Most projects' },
]

interface PartnersTableProps {
  partners: Partner[]
}

export function PartnersTable({ partners }: PartnersTableProps) {
  const [focusArea, setFocusArea] = useState('all')
  const [orgType, setOrgType] = useState('all')
  const [sort, setSort] = useState<Sort>('name-asc')

  const focusAreaOptions = useMemo(() => {
    const subjects = new Set<string>()
    let hasNone = false
    for (const p of partners) {
      if (p.subjects?.length) for (const s of p.subjects) subjects.add(s)
      else hasNone = true
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(subjects)
        .sort()
        .map((s) => ({ value: s, label: s })),
      ...(hasNone ? [{ value: '__none__', label: 'None' }] : []),
    ]
  }, [partners])

  const orgTypeOptions = useMemo(() => {
    const types = new Set<string>()
    let hasNone = false
    for (const p of partners) {
      if (p.organizationTypes?.length) for (const t of p.organizationTypes) types.add(t)
      else hasNone = true
    }
    return [
      { value: 'all', label: 'All' },
      ...Array.from(types)
        .sort()
        .map((t) => ({ value: t, label: t })),
      ...(hasNone ? [{ value: '__none__', label: 'None' }] : []),
    ]
  }, [partners])

  const filtered = useMemo(() => {
    let list = [...partners]
    if (focusArea === '__none__') list = list.filter((p) => !p.subjects?.length)
    else if (focusArea !== 'all') list = list.filter((p) => p.subjects?.includes(focusArea))
    if (orgType === '__none__') list = list.filter((p) => !p.organizationTypes?.length)
    else if (orgType !== 'all') list = list.filter((p) => p.organizationTypes?.includes(orgType))

    list.sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      // projects-desc: treat missing as -1 so they fall below zero-count partners
      const bCount = b.projectCount ?? -1
      const aCount = a.projectCount ?? -1
      return bCount !== aCount ? bCount - aCount : a.name.localeCompare(b.name)
    })

    return list
  }, [partners, focusArea, orgType, sort])

  return (
    <div>
      <div className='flex items-center gap-2 border-b border-[#E8E8E4] pb-5'>
        <FilterSelect
          label='Focus Area'
          value={focusArea}
          onValueChange={setFocusArea}
          options={focusAreaOptions}
        />
        <FilterSelect
          label='Org Type'
          value={orgType}
          onValueChange={setOrgType}
          options={orgTypeOptions}
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

      <div className='mt-6 max-h-[72vh] overflow-y-auto pr-1'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6'>
          {filtered.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className='mt-16 text-center font-sans text-base text-gray-400'>
            No partners match the selected filters.
          </p>
        )}
      </div>
    </div>
  )
}
