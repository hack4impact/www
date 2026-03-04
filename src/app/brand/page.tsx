import type { Metadata } from 'next'
import Image from 'next/image'
import { contentfulApi } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Brand Guidelines',
  description:
    'Visual identity, colors, typography, and usage guidelines for the Hack4Impact brand.',
}

const tocItems = [
  { label: 'Mission', href: '#mission', number: '01' },
  { label: 'Values', href: '#values', number: '02' },
  { label: 'Logo', href: '#logo', number: '03' },
  { label: 'Colors', href: '#colors', number: '04' },
  { label: 'Typography', href: '#typography', number: '05' },
  { label: 'Gradients', href: '#gradients', number: '06' },
  { label: 'Chapter Logos', href: '#chapter-logos', number: '07' },
]

const colors = [
  {
    name: 'Green',
    swatches: [
      { label: '50', hex: '#e2fbdb', tw: 'bg-green-50' },
      { label: '100', hex: '#bff6b2', tw: 'bg-green-100' },
      { label: '200', hex: '#96ef80', tw: 'bg-green-200' },
      { label: '300', hex: '#5fe73e', tw: 'bg-green-300', primary: true },
      { label: '400', hex: '#36b817', tw: 'bg-green-400' },
      { label: '500', hex: '#2b9212', tw: 'bg-green-500' },
      { label: '600', hex: '#21700e', tw: 'bg-green-600' },
      { label: '700', hex: '#18500a', tw: 'bg-green-700' },
      { label: '800', hex: '#0d2d06', tw: 'bg-green-800' },
      { label: '900', hex: '#091e04', tw: 'bg-green-900' },
    ],
  },
  {
    name: 'Blue',
    swatches: [
      { label: '50', hex: '#edf4fd', tw: 'bg-blue-50' },
      { label: '100', hex: '#d9e9fa', tw: 'bg-blue-100' },
      { label: '200', hex: '#c4ddf8', tw: 'bg-blue-200' },
      { label: '300', hex: '#adcff5', tw: 'bg-blue-300', primary: true },
      { label: '400', hex: '#63a3ec', tw: 'bg-blue-400' },
      { label: '500', hex: '#247ee4', tw: 'bg-blue-500' },
      { label: '600', hex: '#1661b4', tw: 'bg-blue-600' },
      { label: '700', hex: '#104581', tw: 'bg-blue-700' },
      { label: '800', hex: '#092749', tw: 'bg-blue-800' },
      { label: '900', hex: '#061a31', tw: 'bg-blue-900' },
    ],
  },
  {
    name: 'Purple',
    swatches: [
      { label: '50', hex: '#f4f2fd', tw: 'bg-purple-50' },
      { label: '100', hex: '#e8e5fc', tw: 'bg-purple-100' },
      { label: '200', hex: '#dbd6fa', tw: 'bg-purple-200' },
      { label: '300', hex: '#ccc6f8', tw: 'bg-purple-300', primary: true },
      { label: '400', hex: '#a094f2', tw: 'bg-purple-400' },
      { label: '500', hex: '#7c6bed', tw: 'bg-purple-500' },
      { label: '600', hex: '#5943e8', tw: 'bg-purple-600' },
      { label: '700', hex: '#321ad1', tw: 'bg-purple-700' },
      { label: '800', hex: '#1d0f7a', tw: 'bg-purple-800' },
      { label: '900', hex: '#140a53', tw: 'bg-purple-900' },
    ],
  },
  {
    name: 'Pink',
    swatches: [
      { label: '50', hex: '#fbf0fd', tw: 'bg-pink-50' },
      { label: '100', hex: '#f8e0fb', tw: 'bg-pink-100' },
      { label: '200', hex: '#f3cef9', tw: 'bg-pink-200' },
      { label: '300', hex: '#efbaf6', tw: 'bg-pink-300', primary: true },
      { label: '400', hex: '#df77ee', tw: 'bg-pink-400' },
      { label: '500', hex: '#ce31e6', tw: 'bg-pink-500' },
      { label: '600', hex: '#a417b9', tw: 'bg-pink-600' },
      { label: '700', hex: '#771186', tw: 'bg-pink-700' },
      { label: '800', hex: '#450a4d', tw: 'bg-pink-800' },
      { label: '900', hex: '#2f0735', tw: 'bg-pink-900' },
    ],
  },
  {
    name: 'Orange',
    swatches: [
      { label: '50', hex: '#fdf1eb', tw: 'bg-orange-50' },
      { label: '100', hex: '#fae3d6', tw: 'bg-orange-100' },
      { label: '200', hex: '#f7d3be', tw: 'bg-orange-200' },
      { label: '300', hex: '#f4c1a4', tw: 'bg-orange-300', primary: true },
      { label: '400', hex: '#e9864e', tw: 'bg-orange-400' },
      { label: '500', hex: '#d05b1a', tw: 'bg-orange-500' },
      { label: '600', hex: '#a04714', tw: 'bg-orange-600' },
      { label: '700', hex: '#73330e', tw: 'bg-orange-700' },
      { label: '800', hex: '#411d08', tw: 'bg-orange-800' },
      { label: '900', hex: '#2b1305', tw: 'bg-orange-900' },
    ],
  },
]

const baseColors = [
  { name: 'Black', hex: '#10100f', tw: 'bg-black' },
  { name: 'White', hex: '#fcf9f2', tw: 'bg-white border border-gray-200' },
]

const gradients = [
  {
    from: 'from-blue-100',
    to: 'to-green-200',
    name: 'Cool',
    stops: 'blue-100 → green-200',
  },
  {
    from: 'from-orange-100',
    to: 'to-pink-200',
    name: 'Warm',
    stops: 'orange-100 → pink-200',
  },
  {
    from: 'from-purple-100',
    to: 'to-blue-200',
    name: 'Dusk',
    stops: 'purple-100 → blue-200',
  },
  {
    from: 'from-green-100',
    to: 'to-purple-200',
    name: 'Meadow',
    stops: 'green-100 → purple-200',
  },
]

export default async function BrandPage() {
  const valuesData = await contentfulApi.getInfoCards('Values')

  return (
    <div className='px-8 py-16 md:px-12 md:py-24 xl:mx-auto xl:max-w-[80vw]'>
      {/* Page header */}
      <header className='mb-20 border-b border-gray-200 pb-16'>
        <p className='mb-4 font-mono text-sm tracking-widest text-gray-500 uppercase'>
          Hack4Impact
        </p>
        <h1 className='font-sans text-5xl md:text-7xl'>Brand Guidelines</h1>
        <p className='mt-6 max-w-2xl font-serif text-lg text-gray-600 md:text-xl'>
          A reference for our visual identity. Logos, colors, typography, and
          usage guidance for anyone representing Hack4Impact.
        </p>
      </header>

      {/* Sidebar + content layout */}
      <div className='flex gap-16 xl:gap-24'>
        {/* Sidebar TOC */}
        <aside className='hidden lg:block'>
          <nav className='sticky top-8 w-44 shrink-0'>
            <p className='mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase'>
              Contents
            </p>
            <ul className='space-y-1'>
              {tocItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className='group flex items-baseline gap-3 py-1.5 text-gray-500 transition-colors hover:text-black'
                  >
                    <span className='font-mono text-xs text-gray-300 transition-colors group-hover:text-gray-500'>
                      {item.number}
                    </span>
                    <span className='font-mono text-sm'>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className='min-w-0 flex-1 space-y-20'>
          {/* 01 Mission */}
          <section id='mission'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              01
            </h2>
            <h3 className='mb-8 font-sans text-3xl md:text-4xl'>Mission</h3>

            <p className='mb-6 font-serif text-3xl leading-snug text-black md:text-4xl'>
              &ldquo;Code for the common good.&rdquo;
            </p>

            <p className='max-w-2xl font-serif text-lg text-gray-600'>
              Hack4Impact exists to connect student technologists with
              nonprofits and social impact organizations. We believe software
              can be a powerful force for good and that learning to build it
              responsibly, collaboratively, and with empathy is the foundation
              of a meaningful career in tech.
            </p>
            <p className='mt-4 max-w-2xl font-serif text-lg text-gray-600'>
              Founded at the University of Pennsylvania in 2014 and incorporated
              as a 501(c)(3) nonprofit in 2016, Hack4Impact has grown into a
              nationwide network of student chapters dedicated to bridging the
              gap between technical skill and community need.
            </p>
          </section>

          {/* 02 Values */}
          <section id='values'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              02
            </h2>
            <h3 className='mb-8 font-sans text-3xl md:text-4xl'>Values</h3>

            {valuesData && (
              <div className='divide-y divide-gray-200 border-y border-gray-200'>
                {valuesData.cards.map((v) => (
                  <div
                    key={v.name}
                    className='grid grid-cols-1 gap-4 py-8 md:grid-cols-3 md:gap-12'
                  >
                    <h4 className='font-sans text-xl'>{v.name}</h4>
                    <p className='col-span-2 font-serif text-gray-600 md:text-lg'>
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 03 Logo */}
          <section id='logo'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              03
            </h2>
            <h3 className='mb-10 font-sans text-3xl md:text-4xl'>Logo</h3>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='flex flex-col'>
                <div className='flex flex-1 items-center justify-center border border-gray-200 bg-white p-12'>
                  <Image
                    src='/logo.svg'
                    alt='Hack4Impact wordmark on light'
                    width={280}
                    height={38}
                    className='brightness-0'
                  />
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <p className='font-mono text-sm text-gray-600'>
                    Wordmark — light
                  </p>
                  <a
                    href='/logo.svg'
                    download
                    className='font-mono text-xs text-gray-400 underline underline-offset-2 hover:text-black'
                  >
                    Download SVG
                  </a>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-1 items-center justify-center bg-black p-12'>
                  <Image
                    src='/logo.svg'
                    alt='Hack4Impact wordmark on dark'
                    width={280}
                    height={38}
                    className='brightness-0 invert'
                  />
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <p className='font-mono text-sm text-gray-600'>
                    Wordmark — dark
                  </p>
                  <a
                    href='/logo.svg'
                    download
                    className='font-mono text-xs text-gray-400 underline underline-offset-2 hover:text-black'
                  >
                    Download SVG
                  </a>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-1 items-center justify-center border border-gray-200 bg-white p-12'>
                  <Image
                    src='/logomark.svg'
                    alt='Hack4Impact logomark on light'
                    width={80}
                    height={80}
                    className='brightness-0'
                  />
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <p className='font-mono text-sm text-gray-600'>
                    Logomark — light
                  </p>
                  <a
                    href='/logomark.svg'
                    download
                    className='font-mono text-xs text-gray-400 underline underline-offset-2 hover:text-black'
                  >
                    Download SVG
                  </a>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='flex flex-1 items-center justify-center bg-black p-12'>
                  <Image
                    src='/logomark.svg'
                    alt='Hack4Impact logomark on dark'
                    width={80}
                    height={80}
                    className='brightness-0 invert'
                  />
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <p className='font-mono text-sm text-gray-600'>
                    Logomark — dark
                  </p>
                  <a
                    href='/logomark.svg'
                    download
                    className='font-mono text-xs text-gray-400 underline underline-offset-2 hover:text-black'
                  >
                    Download SVG
                  </a>
                </div>
              </div>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='border-l-2 border-green-300 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-green-500 uppercase'>
                  Do
                </p>
                <p className='font-serif text-gray-700'>
                  Use the wordmark on light or dark solid backgrounds with
                  sufficient contrast.
                </p>
              </div>
              <div className='border-l-2 border-green-300 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-green-500 uppercase'>
                  Do
                </p>
                <p className='font-serif text-gray-700'>
                  Use the logomark when space is limited, such as app icons and
                  favicons.
                </p>
              </div>
              <div className='border-l-2 border-orange-400 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-orange-500 uppercase'>
                  Don&apos;t
                </p>
                <p className='font-serif text-gray-700'>
                  Don&apos;t stretch, recolor, add effects, or place the logo on
                  busy backgrounds.
                </p>
              </div>
            </div>
          </section>

          {/* 04 Colors */}
          <section id='colors'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              04
            </h2>
            <h3 className='mb-4 font-sans text-3xl md:text-4xl'>Colors</h3>
            <p className='mb-10 max-w-2xl font-serif text-gray-600'>
              Our palette is built around a warm off-white base with vibrant
              accent hues. Blue and green are our primary colors; purple, pink,
              and orange is used for secondary emphasis.
            </p>

            <div className='mb-10'>
              <p className='mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase'>
                Base
              </p>
              <div className='flex gap-4'>
                {baseColors.map((c) => (
                  <div key={c.name} className='flex-1'>
                    <div className={`h-20 w-full ${c.tw}`} />
                    <div className='mt-2'>
                      <p className='font-mono text-sm font-medium'>{c.name}</p>
                      <p className='font-mono text-xs text-gray-500'>{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-10'>
              {colors.map((group) => (
                <div key={group.name}>
                  <p className='mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase'>
                    {group.name}
                  </p>
                  <div className='grid grid-cols-5 gap-1 md:grid-cols-10'>
                    {group.swatches.map((s) => (
                      <div key={s.label}>
                        <div
                          className={`h-14 w-full ${s.tw} ${s.primary ? 'ring-2 ring-black ring-offset-2' : ''}`}
                        />
                        <div className='mt-1.5'>
                          <p className='font-mono text-xs font-medium'>
                            {s.label}
                          </p>
                          <p className='font-mono text-xs leading-tight text-gray-500'>
                            {s.hex}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {group.swatches.some((s) => s.primary) && (
                    <p className='mt-2 font-mono text-xs text-gray-400'>
                      ↑ Ring indicates primary shade
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 05 Typography */}
          <section id='typography'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              05
            </h2>
            <h3 className='mb-10 font-sans text-3xl md:text-4xl'>Typography</h3>

            <div className='space-y-12'>
              {/* Inclusive Sans */}
              <div className='border-t border-gray-200 pt-10'>
                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Font
                    </p>
                    <p className='mt-1 font-mono text-sm'>Inclusive Sans</p>
                  </div>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Role
                    </p>
                    <p className='mt-1 font-mono text-sm'>
                      UI / Body — font-sans
                    </p>
                  </div>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Weights
                    </p>
                    <p className='mt-1 font-mono text-sm'>
                      400 Regular, 400 Italic
                    </p>
                  </div>
                </div>
                <p className='font-sans text-5xl leading-tight md:text-7xl'>
                  Creating software for good.
                </p>
                <p className='mt-4 font-sans text-xl text-gray-600'>
                  Inclusive Sans is designed for readability. It is our primary
                  interface typeface used in headings, navigation, labels, and
                  body copy.
                </p>
                <p className='mt-4 font-sans text-gray-500 italic'>
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                  Vv Ww Xx Yy Zz 0123456789
                </p>
              </div>

              {/* Newsreader */}
              <div className='border-t border-gray-200 pt-10'>
                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Font
                    </p>
                    <p className='mt-1 font-mono text-sm'>Newsreader</p>
                  </div>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Role
                    </p>
                    <p className='mt-1 font-mono text-sm'>
                      Editorial / Accent — font-serif
                    </p>
                  </div>
                  <div>
                    <p className='font-mono text-xs tracking-widest text-gray-500 uppercase'>
                      Weights
                    </p>
                    <p className='mt-1 font-mono text-sm'>
                      400 Regular, 400 Italic
                    </p>
                  </div>
                </div>
                <p className='font-serif text-5xl leading-tight md:text-7xl'>
                  Stories worth telling.
                </p>
                <p className='mt-4 font-serif text-xl text-gray-600'>
                  Newsreader brings warmth and editorial character to longer
                  text, testimonials, journal entries. Use in combination and
                  contrast with Inclusive Sans.
                </p>
                <p className='mt-4 font-serif text-gray-500 italic'>
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                  Vv Ww Xx Yy Zz 0123456789
                </p>
              </div>
            </div>
          </section>

          {/* 06 Gradients */}
          <section id='gradients'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              06
            </h2>
            <h3 className='mb-4 font-sans text-3xl md:text-4xl'>Gradients</h3>
            <p className='mb-10 max-w-2xl font-serif text-gray-600'>
              Soft gradients are used for image placeholders, hero backgrounds,
              and decorative panels.
            </p>

            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              {gradients.map((g) => (
                <div key={g.name}>
                  <div
                    className={`aspect-[4/3] w-full bg-gradient-to-br ${g.from} ${g.to}`}
                  />
                  <div className='mt-3'>
                    <p className='font-mono text-sm font-medium'>{g.name}</p>
                    <p className='font-mono text-xs text-gray-400'>{g.stops}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07 Chapter Logos */}
          <section id='chapter-logos'>
            <h2 className='mb-2 font-mono text-xs tracking-widest text-gray-500 uppercase'>
              07
            </h2>
            <h3 className='mb-4 font-sans text-3xl md:text-4xl'>
              Chapter Logos
            </h3>
            <p className='mb-10 max-w-2xl font-serif text-gray-600'>
              Each Hack4Impact chapter has its own co-branded logo that pairs
              the chapter&apos;s university name with the Hack4Impact wordmark.
              These are maintained centrally to ensure consistency across our
              network.
            </p>

            <div className='border border-gray-200 p-8 md:p-12'>
              <div className='max-w-lg'>
                <h4 className='mb-3 font-sans text-xl'>
                  Request your chapter&apos;s logo
                </h4>
                <p className='mb-6 font-serif text-gray-600'>
                  Chapter leads can request logo files, including SVG, PNG, and
                  dark-mode variants, by emailing our operations team. Please
                  include your chapter name and intended use in your message.
                </p>
                <a
                  href='mailto:contact@hack4impact.org?subject=Chapter Logo Request'
                  className='inline-flex items-center gap-2 font-mono text-sm underline underline-offset-4 hover:text-gray-600'
                >
                  contact@hack4impact.org
                </a>
              </div>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
              <div className='border-l-2 border-green-300 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-green-500 uppercase'>
                  Provided formats
                </p>
                <p className='font-serif text-gray-700'>
                  SVG (scalable), PNG at 1× and 2×, and dark-mode variants for
                  each.
                </p>
              </div>
              <div className='border-l-2 border-green-300 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-green-500 uppercase'>
                  Approved uses
                </p>
                <p className='font-serif text-gray-700'>
                  Chapter websites, social profiles, presentations, recruiting
                  materials, and merchandise.
                </p>
              </div>
              <div className='border-l-2 border-orange-400 pl-4'>
                <p className='mb-1 font-mono text-xs tracking-widest text-orange-500 uppercase'>
                  Don&apos;t
                </p>
                <p className='font-serif text-gray-700'>
                  Don&apos;t alter chapter logos or create your own without
                  approval from the operations team.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className='border-t border-gray-200 pt-12'>
            <p className='font-mono text-sm text-gray-500'>
              Questions about brand usage?{' '}
              <a
                href='mailto:contact@hack4impact.org?subject=Brand Guidelines'
                className='underline underline-offset-2 hover:text-black'
              >
                contact@hack4impact.org
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
