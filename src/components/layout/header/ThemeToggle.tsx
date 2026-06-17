'use client'

import { useEffect, useState } from 'react'

import { LucideMoon, LucideSun } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      type='button'
      onClick={toggleDark}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className='border-separator bg-root text-inverse hover:bg-panel fixed right-6 bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition-colors'
    >
      {dark ? <LucideSun size={16} /> : <LucideMoon size={16} />}
    </button>
  )
}
