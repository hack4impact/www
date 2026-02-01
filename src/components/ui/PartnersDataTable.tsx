'use client'

import { DataTable, type Column } from '@/components/ui/DataTable'
import type { Partner } from '@/lib/types/partner'

const columns: Column<Partner>[] = [
  {
    id: 'name',
    header: 'Partner',
    accessorKey: 'name',
    width: '30%',
    accessor: (row) => (
      <>
        <span className='font-sans text-base inline-flex items-baseline gap-1.5'>
          {row.name}
          {row.website && (
            <a
              href={row.website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-gray-700 self-center'
              onClick={(e) => e.stopPropagation()}
              aria-label={`Visit ${row.name} website`}
            >
              <svg
                width='12'
                height='12'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                <polyline points='15 3 21 3 21 9' />
                <line x1='10' y1='14' x2='21' y2='3' />
              </svg>
            </a>
          )}
        </span>
        <span className='block text-sm text-gray-500 font-serif md:hidden'>
          {row.organizationTypes?.join(', ')}
        </span>
      </>
    ),
  },
  {
    id: 'organizationTypes',
    header: 'Type',
    accessorKey: 'organizationTypes',
    width: '20%',
    accessor: (row) => row.organizationTypes?.join(', ') ?? '',
    className: 'font-serif text-gray-600 hidden md:table-cell',
    headerClassName: 'hidden md:table-cell',
  },
  {
    id: 'subjects',
    header: 'Subject',
    accessorKey: 'subjects',
    width: '25%',
    accessor: (row) => row.subjects?.join(', ') ?? '',
    className: 'font-serif text-gray-600 hidden lg:table-cell',
    headerClassName: 'hidden lg:table-cell',
  },
  {
    id: 'populations',
    header: 'Population',
    accessorKey: 'populations',
    width: '25%',
    accessor: (row) => row.populations?.join(', ') ?? '',
    className: 'font-serif text-gray-600 hidden lg:table-cell',
    headerClassName: 'hidden lg:table-cell',
  },
]

interface PartnersDataTableProps {
  partners: Partner[]
}

export function PartnersDataTable({ partners }: PartnersDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={partners}
      wrapperClassName='overflow-auto max-h-[70vh] bg-[#FCF9F2]/80 backdrop-blur-sm rounded'
      theadClassName='sticky top-0 bg-[#FCF9F2] border-b-2 border-gray-200'
      initialSort={{ columnId: 'name', direction: 'asc' }}
    />
  )
}
