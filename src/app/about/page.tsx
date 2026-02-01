import { type ReactNode } from 'react'
import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { GridTable } from '@/components/ui/GridTable'
import { CallToAction } from '@/components/ui/CallToAction'
import { contentfulApi } from '@/lib/contentful'
import { Leaf, Compass, Accessibility } from 'iconoir-react'

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const valuesIcons: Record<string, ReactNode> = {
  Leaf: <Leaf {...iconProps} />,
  Compass: <Compass {...iconProps} />,
  Accessibility: <Accessibility {...iconProps} />,
}

export default async function AboutPage() {
  const [members, values] = await Promise.all([
    contentfulApi.getBoardTeamMembers(),
    contentfulApi.getInfoCards('Values'),
  ])

  const opsOrder = ['Khoa', 'Govind', 'Brian', 'Sophia']
  const operationsTeam = members
    .filter((m) => m.team === 'Operations Team')
    .sort((a, b) => {
      const ai = opsOrder.findIndex((n) => a.name.startsWith(n))
      const bi = opsOrder.findIndex((n) => b.name.startsWith(n))
      return (
        (ai === -1 ? opsOrder.length : ai) - (bi === -1 ? opsOrder.length : bi)
      )
    })
  const boardOfDirectors = members
    .filter((m) => m.team === 'Board of Directors')
    .sort((a, b) => a.name.localeCompare(b.name))
  const advisoryBoard = members
    .filter((m) => m.team === 'Advisory Board')
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <SplitHero
        heading='Creating software to support those supporting their communities'
        buttonText='Meet the Team'
        buttonHref='#operations-team'
        gradient='from-blue-100 to-green-200'
      />

      {values && (
        <CardGrid
          heading='Our values'
          icons={valuesIcons}
          items={values.cards}
        />
      )}

      <section className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='px-8 py-8 lg:px-0 lg:py-12 lg:pl-8'>
          <div className='aspect-[4/5] w-full bg-gradient-to-br from-orange-100 to-pink-200' />
        </div>

        <div className='flex flex-col items-start justify-center p-8 lg:px-24 lg:py-12'>
          <h2 className='font-sans text-3xl md:text-4xl'>Our story</h2>
          <p className='mt-6 text-base md:mt-8 md:text-lg'>
            Hack for Impact began at the University of Pennsylvania in 2014 and
            became an official 501(c)(3) non-profit in 2016. It began as a small
            group of developers volunteering their skills for local nonprofits.
            What started as a student organization quickly grew into a
            nationwide network of chapters, each dedicated to bridging the gap
            between student technical skills, desires to do good and community
            needs. Today, we continue that mission, building a community of
            socially-conscious technologists.
          </p>
        </div>
      </section>

      {/* Team Sections */}
      <section className='px-8 py-16 md:px-12 md:py-24'>
        <GridTable
          id='operations-team'
          heading='Operations Team'
          columns={['Name', 'Title', 'Contact']}
          rows={operationsTeam.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              {
                text: m.email ?? '',
                href: m.email ? `mailto:${m.email}` : undefined,
              },
            ],
          }))}
          className='mb-16'
        />

        <GridTable
          heading='Board of Directors'
          columns={['Name', 'Title', 'Contact']}
          rows={boardOfDirectors.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              {
                text: m.email ?? '',
                href: m.email ? `mailto:${m.email}` : undefined,
              },
            ],
          }))}
          className='mb-16'
        />

        <GridTable
          heading='Advisory Board'
          columns={['Name', 'Title', 'Website']}
          rows={advisoryBoard.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              { text: m.website ?? '', href: m.website },
            ],
          }))}
        />
      </section>

      <CallToAction
        heading='Want to join our team?'
        buttonText='Get involved'
        href='mailto:contact@hack4impact.org?subject=Operations Team Interest'
      />
    </>
  )
}
