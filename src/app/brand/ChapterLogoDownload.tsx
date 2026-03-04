'use client'

import { useState } from 'react'
import type { ChapterLogoData } from '@/lib/contentful/api'

interface Props {
  chapters: ChapterLogoData[]
}

async function triggerDownload(url: string, filename: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = filename
  a.click()
  URL.revokeObjectURL(objectUrl)
}

export default function ChapterLogoDownload({ chapters }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const chapter = chapters[selectedIndex]

  if (!chapter) return null

  return (
    <div>
      <div className='mb-6'>
        <label
          htmlFor='chapter-select'
          className='mb-2 block font-mono text-xs tracking-widest text-gray-500 uppercase'
        >
          Chapter
        </label>
        <select
          id='chapter-select'
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
          className='border border-gray-200 bg-white px-3 py-2 font-sans text-base focus:outline-none focus:ring-2 focus:ring-black'
        >
          {chapters.map((ch, i) => (
            <option key={ch.shortName} value={i}>
              {ch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Previews */}
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='flex min-h-40 items-center justify-center border border-gray-200 bg-white p-12'>
          {chapter.lightSvgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={chapter.lightSvgUrl}
              alt={`${chapter.name} light logo`}
              className='max-h-24 max-w-full'
            />
          ) : (
            <span className='font-mono text-sm text-gray-400'>Not available</span>
          )}
        </div>
        <div className='flex min-h-40 items-center justify-center bg-gray-900 p-12'>
          {chapter.darkSvgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={chapter.darkSvgUrl}
              alt={`${chapter.name} dark logo`}
              className='max-h-24 max-w-full'
            />
          ) : (
            <span className='font-mono text-sm text-gray-400'>Not available</span>
          )}
        </div>
      </div>

      {/* Downloads */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <DownloadGroup label='Light' chapter={chapter} variant='light' />
        <DownloadGroup label='Dark' chapter={chapter} variant='dark' />
      </div>
    </div>
  )
}

function DownloadGroup({
  label,
  chapter,
  variant,
}: {
  label: string
  chapter: ChapterLogoData
  variant: 'light' | 'dark'
}) {
  const [loading, setLoading] = useState<string | null>(null)

  const links = [
    {
      label: 'SVG',
      url: variant === 'light' ? chapter.lightSvgUrl : chapter.darkSvgUrl,
      filename: variant === 'light'
        ? `chapter-logo-${chapter.shortName}.svg`
        : `chapter-logo-dark-${chapter.shortName}.svg`,
    },
    {
      label: 'PNG 1×',
      url: variant === 'light' ? chapter.lightPng1xUrl : chapter.darkPng1xUrl,
      filename: variant === 'light'
        ? `chapter-logo-${chapter.shortName}.png`
        : `chapter-logo-dark-${chapter.shortName}.png`,
    },
    {
      label: 'PNG 2×',
      url: variant === 'light' ? chapter.lightPng2xUrl : chapter.darkPng2xUrl,
      filename: variant === 'light'
        ? `chapter-logo-2x-${chapter.shortName}.png`
        : `chapter-logo-dark-2x-${chapter.shortName}.png`,
    },
  ]

  async function handleDownload(url: string, filename: string) {
    setLoading(filename)
    try {
      await triggerDownload(url, filename)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div>
      <p className='mb-3 font-mono text-xs tracking-widest text-gray-500 uppercase'>
        {label}
      </p>
      <div className='flex flex-wrap gap-3'>
        {links.map(({ label: linkLabel, url, filename }) =>
          url ? (
            <button
              key={linkLabel}
              type='button'
              disabled={loading !== null}
              onClick={() => handleDownload(url, filename)}
              className='inline-flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 font-mono text-sm hover:bg-gray-50 disabled:opacity-50'
            >
              <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
                <path
                  d='M6 1v7M3 6l3 3 3-3M1 10h10'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              {loading === filename ? '…' : linkLabel}
            </button>
          ) : (
            <span
              key={linkLabel}
              className='inline-flex items-center gap-1.5 border border-gray-100 px-3 py-1.5 font-mono text-sm text-gray-300'
            >
              {linkLabel}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
