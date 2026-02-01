import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ChaptersDataTable } from '@/components/ui/ChaptersDataTable'
import { CardGrid } from '@/components/ui/CardGrid'
import { PageIntro } from '@/components/ui/PageIntro'
import { StatBar } from '@/components/ui/StatBar'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import { Code, ColorFilter, Agile, KanbanBoard } from 'iconoir-react'
import Image from 'next/image'

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const rolesIcons = {
  Code: <Code {...iconProps} />,
  ColorFilter: <ColorFilter {...iconProps} />,
  Agile: <Agile {...iconProps} />,
  KanbanBoard: <KanbanBoard {...iconProps} />,
}

export default async function ChaptersPage() {
  const [chapters, volunteerCounts, roles, faqs, chapterBanner] =
    await Promise.all([
      notionApi.getChapters(),
      notionApi.getVolunteerCounts(),
      contentfulApi.getInfoCards('Chapter Roles'),
      contentfulApi.getFAQs('Chapter Questions'),
      contentfulApi.getAssetUrl('chapter-banner'),
    ])

  const stats = [
    { label: 'Active chapters', value: chapters.length },
    { label: 'Total volunteers', value: volunteerCounts.total },
    { label: 'Active volunteers', value: volunteerCounts.active },
  ]

  return (
    <>
      {/* Banner */}
      <section className='relative h-56 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 md:h-80'>
        {chapterBanner && (
          <Image
            src={chapterBanner}
            alt='A group panorama of all the students from the University of Maryland chapter spanning the banner. '
            fill
            className='object-contain object-bottom'
          />
        )}
      </section>

      <PageIntro
        heading='Chapters'
        description='Hack4Impact operates through student-led chapters at universities across the country. Each chapter partners with local nonprofits to build software that serves their communities.'
      />

      <StatBar stats={stats} />

      {/* Data Table */}
      <section className='p-8 md:p-12'>
        <ChaptersDataTable chapters={chapters} />
      </section>

      {roles && (
        <CardGrid
          heading='Join a chapter'
          description='Each chapter is made up of students filling different roles. Here are the positions you can apply for at your local chapter.'
          icons={rolesIcons}
          items={roles.cards}
          columns={4}
        />
      )}

      <FAQList items={faqs} />

      <CallToAction
        heading='No chapter at your school?'
        buttonText='Start one'
        href='/students'
        color='bg-green-100'
      />
    </>
  )
}
