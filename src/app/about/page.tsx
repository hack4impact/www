import Image from 'next/image'
import { type ReactNode } from 'react'
import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { CTABand } from '@/components/ui/CTABand'
import { contentfulApi } from '@/lib/contentful'
import type { BoardTeamMember } from '@/lib/types'
import { Leaf, Compass, Accessibility } from 'iconoir-react'
import { iconProps } from '@/lib/constants'

function TeamCard({ member }: { member: BoardTeamMember }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const href = member.email
    ? `mailto:${member.email}`
    : (member.website ?? undefined)
  const linkLabel = member.email ?? member.website

  return (
    <div>
      <div className='bg-bg-subtle relative mb-3 aspect-square w-full overflow-hidden rounded'>
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='font-serif text-2xl font-light text-gray-400 italic'>
              {initials}
            </span>
          </div>
        )}
      </div>
      <p className='font-sans text-sm font-medium text-black'>{member.name}</p>
      <p className='mt-0.5 font-sans text-sm text-gray-500'>{member.title}</p>
      {href && linkLabel && (
        <a
          href={href}
          target={member.email ? undefined : '_blank'}
          rel={member.email ? undefined : 'noopener noreferrer'}
          className='mt-1 block font-sans text-xs text-blue-500 hover:underline'
        >
          {linkLabel}
        </a>
      )}
    </div>
  )
}

function TeamGroup({
  label,
  members,
  id,
}: {
  label: string
  members: BoardTeamMember[]
  id?: string
}) {
  return (
    <div id={id} className={id ? 'scroll-mt-8' : ''}>
      <div className='mb-8 flex items-center gap-4'>
        <p className='shrink-0 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
          {label}
        </p>
        <div className='bg-border-subtle h-px flex-1' />
      </div>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
        {members.map((m) => (
          <TeamCard key={m.name} member={m} />
        ))}
      </div>
    </div>
  )
}

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

  const opsOrder = ['Khoa', 'Govind', 'Brian']
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
        tag='About'
        heading='Creating software to support those supporting their communities'
        buttonText='Meet the team'
        buttonHref='#operations-team'
        gradient='from-blue-100 to-green-200'
      />

      {values && (
        <CardGrid
          heading='Our values'
          icons={valuesIcons}
          items={values.cards}
          className='xl:mx-auto xl:max-w-[80vw]'
        />
      )}

      <section className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='px-8 py-8 lg:px-0 lg:py-12 lg:pl-8'>
          <div className='aspect-[4/5] w-full bg-gradient-to-br from-orange-100 to-pink-200' />
        </div>

        <div className='flex flex-col items-start justify-center p-8 lg:px-24 lg:py-12'>
          <h2 className='font-sans text-3xl md:text-4xl'>Our story</h2>
          <p className='mt-6 font-serif text-base md:mt-8 md:text-lg'>
            Hack4Impact began at the University of Pennsylvania in 2014 and
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
      <section className='px-8 py-16 md:px-16 md:py-24'>
        <div className='mx-auto max-w-[1312px]'>
          <div className='mb-16'>
            <p className='mb-3 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
              The People
            </p>
            <h2 className='font-serif text-[40px] leading-[48px] font-light tracking-[-0.02em] text-black italic'>
              Our team
            </h2>
          </div>

          <div className='space-y-16'>
            <TeamGroup
              id='operations-team'
              label='Operations Team'
              members={operationsTeam}
            />
            <TeamGroup label='Board of Directors' members={boardOfDirectors} />
            <TeamGroup label='Advisory Board' members={advisoryBoard} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
