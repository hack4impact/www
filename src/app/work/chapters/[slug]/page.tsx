import { notFound } from 'next/navigation'
import { Separator } from '@base-ui/react/separator'
import { notionApi } from '@/lib/notion'
import { ProjectsTable } from '@/components/ui/ProjectsTable'
import { LinkCard } from '@/components/ui/LinkCard'
import { contentfulApi } from '@/lib/contentful'
import Image from 'next/image'

interface ChapterPageProps {
  params: Promise<{ slug: string }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params
  const [chapter, chapterImage] = await Promise.all([
    notionApi.getChapterBySlug(slug),
    contentfulApi.getAssetUrl(slug),
  ])

  if (!chapter) {
    notFound()
  }

  // Filter projects by this chapter
  const allProjects = await notionApi.getProjects()
  const chapterProjects = allProjects.filter(
    (project) => project.chapter === chapter.name.replace('Hack4Impact ', ''),
  )

  return (
    <>
      {/* Page header */}
      <section
        className='relative overflow-hidden border-b border-[#E8E8E4] px-8 pb-14 pt-16 md:px-16'
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(59.6% -0.045 -0.169 / 10%) 0%, oklab(0% 0 0 / 0%) 60%)',
          backgroundOrigin: 'border-box',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <p className='mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-500'>
            Our Chapters
          </p>
          <h1>
            <span className='block font-serif text-[40px] font-light leading-[1.1] tracking-[-0.02em] text-black md:text-[56px] md:leading-[62px]'>
              Hack4Impact
            </span>
            <span className='block font-serif text-[40px] font-light italic leading-[1.1] tracking-[-0.02em] text-blue-500 md:text-[56px] md:leading-[62px]'>
              {chapter.university}
            </span>
          </h1>
        </div>

        {chapterImage && (
          <div className='absolute inset-y-0 right-0 hidden w-1/3 md:block'>
            <Image
              fill
              className='object-cover'
              style={{ objectPosition: 'center 30%' }}
              src={chapterImage}
              alt={`${chapter.name} chapter`}
              sizes='53vw'
            />
          </div>
        )}
      </section>

      {/* Stats bar */}
      <section className='border-b border-[#e8e8e8] px-8 md:px-16'>
        <div className='mx-auto flex max-w-[1312px]'>
          {[
            { value: chapter.memberCount, label: 'Active Members' },
            { value: chapter.projectCount, label: 'Projects Delivered' },
            { value: chapter.founded || '—', label: 'Year Founded' },
            { value: chapter.status || '—', label: 'Status' },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={[
                'flex flex-1 flex-col items-center justify-center gap-1.5 py-7',
                i < arr.length - 1 ? 'border-r border-[#e8e8e8]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className='font-serif text-[32px] font-light leading-[40px] tracking-[-0.01em] text-black'>
                {stat.value}
              </span>
              <span className='font-mono text-[11px] uppercase tracking-[0.1em] text-gray-500'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className='px-8 py-12 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          {/* Description */}
          <p className='mb-8 font-serif text-lg md:text-xl'>{chapter.description}</p>

          <Separator className='mb-8 border-t border-gray-300' />

          {/* Link Cards */}
          {(chapter.website || chapter.github || chapter.instagram) && (
            <div className='mb-8 flex flex-wrap gap-4'>
              {chapter.website && (
                <LinkCard label='Website' href={chapter.website} className='flex-1' />
              )}
              {chapter.github && (
                <LinkCard label='GitHub' href={chapter.github} className='flex-1' />
              )}
              {chapter.instagram && (
                <LinkCard label='Instagram' href={chapter.instagram} className='flex-1' />
              )}
            </div>
          )}

          {/* Projects */}
          {chapterProjects.length > 0 && (
            <>
              <Separator className='mb-8 border-t border-gray-300' />
              <h2 className='mb-4 font-sans text-xl md:text-2xl'>Projects</h2>
              <ProjectsTable projects={chapterProjects} hideChapterFilter />
            </>
          )}
        </div>
      </section>
    </>
  )
}
