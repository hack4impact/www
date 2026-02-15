'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface Column<T> {
  id: string // Unique identifier for the column
  header: string
  accessor: (row: T) => React.ReactNode
  accessorKey?: keyof T // For sorting raw values
  width?: string // Optional width for the column
  className?: string
  headerClassName?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  getRowHref?: (row: T) => string
  wrapperClassName?: string
  theadClassName?: string
  initialSort?: {
    columnId: string
    direction: 'asc' | 'desc'
  }
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  getRowHref,
  wrapperClassName,
  theadClassName,
  initialSort,
}: DataTableProps<T>) {
  const router = useRouter()
  const [sortConfig, setSortConfig] = useState(initialSort)

  const sortedData = useMemo(() => {
    const sortableData = [...data]
    if (sortConfig) {
      const { columnId, direction } = sortConfig
      const sortColumn = columns.find((c) => c.id === columnId)
      const accessorKey = sortColumn?.accessorKey

      if (accessorKey) {
        sortableData.sort((a, b) => {
          const aRaw = a[accessorKey]
          const bRaw = b[accessorKey]

          let cmp: number
          if (typeof aRaw === 'number' && typeof bRaw === 'number') {
            cmp = aRaw - bRaw
          } else {
            const aStr = String(aRaw ?? '').toLowerCase()
            const bStr = String(bRaw ?? '').toLowerCase()
            cmp = aStr < bStr ? -1 : aStr > bStr ? 1 : 0
          }

          return direction === 'asc' ? cmp : -cmp
        })
      }
    }
    return sortableData
  }, [data, sortConfig, columns])

  const handleRowClick = (row: T) => {
    if (getRowHref) {
      router.push(getRowHref(row))
    }
  }

  const handleSort = (columnId: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (
      sortConfig &&
      sortConfig.columnId === columnId &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc'
    }
    setSortConfig({ columnId, direction })
  }

  const getSortIndicator = (columnId: string) => {
    if (!sortConfig || sortConfig.columnId !== columnId) {
      return null
    }
    if (sortConfig.direction === 'asc') {
      return (
        <svg
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          className='ml-1 shrink-0'
        >
          <path
            d='M9 7.5L6 4.5L3 7.5'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    }
    return (
      <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        className='ml-1 shrink-0'
      >
        <path
          d='M3 4.5L6 7.5L9 4.5'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }

  return (
    <div className={wrapperClassName}>
      <table className='w-full'>
        <thead className={theadClassName}>
          <tr className='border-b border-gray-200 text-left'>
            {columns.map((column) => (
              <th
                key={column.id}
                style={{ width: column.width }}
                className={cn(
                  'py-4 px-4 font-sans font-medium cursor-pointer',
                  column.headerClassName,
                )}
                onClick={() => column.accessorKey && handleSort(column.id)}
              >
                <div
                  className={cn(
                    'flex items-center',
                    column.headerClassName?.includes('text-right')
                      ? 'justify-end'
                      : '',
                  )}
                >
                  {column.header}
                  {getSortIndicator(column.id)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className={cn(
                'border-b border-gray-100',
                getRowHref ? 'hover:bg-gray-50 cursor-pointer' : '',
              )}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.id} className={cn('py-4 px-4', column.className)}>
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
