import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ChaptersTable } from '@/components/ui/ChaptersTable'
import { CardGrid } from '@/components/ui/CardGrid'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
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
      {/* Page header */}
      <section
        className='border-b border-[#E8E8E4] px-8 pb-12 pt-14 md:px-16'
        style={{
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(92.7% -0.010 -0.027) 0%, oklab(0% 0 0 / 0%) 60%)',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex items-baseline justify-between pb-4'>
            <p className='font-mono text-[11px] uppercase tracking-[0.12em] text-blue-500'>
              Our Chapters
            </p>
            <p className='font-mono text-[11px] tracking-[0.08em] text-gray-400'>
              {chapters.length} chapters
            </p>
          </div>
          <h1 className='pb-4 font-serif text-[40px] font-light leading-[48px] tracking-[-0.02em] text-black'>
            A nationwide student network
          </h1>
          <p className='font-sans text-base leading-6 text-gray-500'>
            Student-run, university-based chapters sharing resources, mentors,
            and a common mission.
          </p>
        </div>
      </section>

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

      <CallToAction
        heading='No chapter at your school?'
        buttonText='Start one'
        href='/get-involved/students'
        color='bg-blue-100'
      />
    </>
  )
}
