import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

import './globals.css'

const inclusiveSans = localFont({
  src: [
    {
      path: '../fonts/InclusiveSans.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/InclusiveSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-inclusive-sans',
})

const newsreader = localFont({
  src: [
    {
      path: '../fonts/Newsreader.woff2',
      weight: '200 800',
      style: 'normal',
    },
    {
      path: '../fonts/Newsreader-Italic.woff2',
      weight: '200 800',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-newsreader',
})

const paperMono = localFont({
  src: [
    {
      path: '../fonts/PaperMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-paper-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Hack4Impact',
    template: '%s | Hack4Impact',
  },
  description: 'Code for the common good.',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Hack4Impact',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${inclusiveSans.variable} ${newsreader.variable} ${paperMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className='relative flex min-h-screen flex-col font-sans'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
