import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Newsreader-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-newsreader',
})

const atkinsonHyperlegibleMono = localFont({
  src: [
    {
      path: '../fonts/AtkinsonHyperlegibleMono-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../fonts/AtkinsonHyperlegibleMono-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-atkinson-mono',
})



export const metadata: Metadata = {
  title: {
    default: 'Hack4Impact',
    template: '%s | Hack4Impact',
  },
  description: 'Code for the common good.',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Hack for Impact',
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
      className={`${inclusiveSans.variable} ${newsreader.variable} ${atkinsonHyperlegibleMono.variable}`}
    >
      <body className='flex min-h-screen flex-col relative'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
