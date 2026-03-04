import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-start justify-center px-8 py-24 md:px-12'>
      <p className='mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase'>
        404
      </p>
      <h1 className='font-sans text-4xl md:text-5xl'>Page not found</h1>
      <p className='mt-4 max-w-md font-serif text-lg text-gray-600'>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href='/'
        className='mt-8 font-mono text-sm underline underline-offset-4 hover:text-gray-600'
      >
        Back to home
      </Link>
    </div>
  )
}
