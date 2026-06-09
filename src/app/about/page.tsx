import Image from 'next/image'
import { TabbedCards } from '@/components/ui/TabbedCards'
import { ActionBand } from '@/components/ui/ActionBand'
import { contentfulApi } from '@/lib/contentful'
import type { BoardTeamMember } from '@/lib/types'

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
      <div className='bg-panel relative mb-2 aspect-square w-full overflow-hidden rounded'>
        {member.imageUrl ? (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='text-gray-3 font-serif text-xl font-light italic'>
              {initials}
            </span>
          </div>
        )}
      </div>
      <p className='text-inverse font-sans text-sm font-medium'>
        {member.name}
      </p>
      <p className='text-gray-3 mt-0.5 font-sans text-xs'>{member.title}</p>
      {href && linkLabel && (
        <a
          href={href}
          target={member.email ? undefined : '_blank'}
          rel={member.email ? undefined : 'noopener noreferrer'}
          className='mt-1 block font-sans text-sm text-blue-500 hover:underline'
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
      <div className='mb-5 flex items-center gap-4'>
        <p className='label shrink-0 text-blue-500'>{label}</p>
        <div className='bg-separator h-px flex-1' />
      </div>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5'>
        {members.map((m) => (
          <TeamCard key={m.name} member={m} />
        ))}
      </div>
    </div>
  )
}

export default async function AboutPage() {
  const [members, values, storyPhotoUrl] = await Promise.all([
    contentfulApi.getBoardTeamMembers(),
    contentfulApi.getInfoCards('Values'),
    contentfulApi.getAssetUrl('our-story-photo'),
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
      <section className='gradient-hero border-separator border-b px-8 pt-20 pb-16 md:px-16 md:pt-24 md:pb-20'>
        <div className='mx-auto flex max-w-[1312px] flex-col items-center'>
          <p className='label mb-8 text-center text-blue-500'>
            About Hack4Impact
          </p>
          <h1 className='flex flex-col items-center text-center'>
            <span className='text-inverse font-serif text-5xl leading-tight font-light tracking-[-0.02em] md:text-[76px] md:leading-[84px]'>
              Built by students.
            </span>
            <span className='font-serif text-5xl leading-tight font-light tracking-[-0.02em] text-blue-500 italic md:text-[76px] md:leading-[84px]'>
              For communities.
            </span>
          </h1>
          <p className='text-gray-3 mt-8 max-w-[560px] text-center font-sans text-lg leading-7'>
            We pair student developers with nonprofits to build impactful
            technology and develop engineers who use their skills for good.
          </p>
        </div>
      </section>

      {values && (
        <TabbedCards
          items={values.cards}
          label='Our values'
          heading='What we stand for'
          cardLabel='Value'
        />
      )}

      <section className='border-checkbox-outline border-t px-8 py-12 md:px-16 md:py-16'>
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex flex-col gap-10 md:flex-row md:items-start md:gap-16 lg:gap-20'>
            <div className='flex min-w-0 flex-1 flex-col'>
              <p className='label mb-7 text-blue-500'>Our Story</p>
              <div className='mb-11'>
                <h2 className='text-inverse font-serif text-4xl leading-tight font-light tracking-[-0.02em] md:text-[52px] md:leading-[58px]'>
                  A decade of
                </h2>
                <h2 className='font-serif text-4xl leading-tight font-light tracking-[-0.02em] text-blue-500 italic md:text-[52px] md:leading-[58px]'>
                  building for good.
                </h2>
              </div>
              <div className='mb-12 flex flex-col gap-5'>
                <p className='text-gray-3 font-sans text-base leading-7 md:text-[17px]'>
                  Hack4Impact was founded in 2014 at the University of
                  Pennsylvania by a group of students who believed software
                  could be a force for social good. The idea was simple: pair
                  student developers with nonprofits that needed technical help
                  but couldn&apos;t afford it.
                </p>
                <p className='text-gray-3 font-sans text-base leading-7 md:text-[17px]'>
                  In 2016, we became a 501(c)(3) nonprofit ourselves —
                  formalizing the mission and opening the model to universities
                  nationwide. Today, Hack4Impact chapters operate at
                  universities across North America.
                </p>
              </div>
              <p className='label-xs text-gray-3'>
                Est. 2014 · University of Pennsylvania
              </p>
            </div>

            <div className='relative w-full shrink-0 overflow-hidden rounded md:w-[280px] lg:w-[340px]'>
              {storyPhotoUrl ? (
                <Image
                  src={storyPhotoUrl}
                  alt='Our story'
                  width={0}
                  height={0}
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 260px, 300px'
                  className='h-auto w-full'
                />
              ) : (
                <div className='aspect-[4/5] bg-gradient-to-b from-blue-50 via-blue-100 to-blue-50' />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <section className='px-8 py-12 md:px-16 md:py-16'>
        <div className='mx-auto max-w-[1312px]'>
          <div className='mb-10'>
            <p className='label mb-3 text-blue-500'>The People</p>
            <h2 className='heading-display italic'>Our team</h2>
          </div>

          <div className='space-y-10'>
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

      <ActionBand />
    </>
  )
}
