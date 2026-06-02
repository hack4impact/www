import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ChaptersTable } from '@/components/ui/ChaptersTable'
import { CardGrid } from '@/components/ui/CardGrid'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { WorkHeader } from '@/components/ui/WorkHeader'
import { Code, ColorFilter, Agile, KanbanBoard } from 'iconoir-react'
import { iconProps } from '@/lib/constants'

const rolesIcons = {
  Code: <Code {...iconProps} />,
  ColorFilter: <ColorFilter {...iconProps} />,
  Agile: <Agile {...iconProps} />,
  KanbanBoard: <KanbanBoard {...iconProps} />,
}

export default async function ChaptersPage() {
  const [chapters, roles, faqs] = await Promise.all([
    notionApi.getChapters(),
    contentfulApi.getInfoCards('Chapter Roles'),
    contentfulApi.getFAQs('Chapter Questions'),
  ])

  // Fetch all chapter images in parallel (each is individually cached)
  const imageUrls = await Promise.all(
    chapters.map((c) => contentfulApi.getAssetUrl(c.slug)),
  )
  const images: Record<string, string | null> = {}
  chapters.forEach((c, i) => {
    images[c.slug] = imageUrls[i]
  })

  return (
    <>
      <WorkHeader
        label='Our Chapters'
        title='A nationwide student network'
        countLabel={`${chapters.length} chapters`}
        description='Student-run, university-based chapters sharing resources, mentors, and a common mission.'
        labelColor='text-blue-500'
        gradientOklab='92.7% -0.010 -0.027'
      />

      {/* Chapters grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ChaptersTable chapters={chapters} images={images} />
        </div>
      </section>

      {roles && (
        <CardGrid
          heading='Join a chapter'
          description='Each chapter is made up of students filling different roles. Here are the positions you can apply for at your local chapter.'
          icons={rolesIcons}
          items={roles.cards}
          columns={4}
          className='xl:mx-auto xl:max-w-[80vw]'
        />
      )}

      <FAQList items={faqs} />

      <CTABand />
    </>
  )
}
