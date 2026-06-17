import Image from 'next/image'
import { notFound } from 'next/navigation'

import { ProjectsTable } from '@/components/projects/ProjectsTable'
import { StatBar } from '@/components/ui/StatBar'
import { contentfulApi } from '@/lib/contentful'
import { notionApi } from '@/lib/notion'
import { cn } from '@/lib/utils'

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
      <section className='gradient-bl-blue border-separator relative overflow-hidden border-b px-8 pt-16 pb-14 md:px-16'>
        <div className='mx-auto max-w-[1312px] md:pr-[34%]'>
          <p className='label mb-6 text-blue-500'>Our Chapters</p>
          <h1>
            <span className='text-inverse block font-serif text-[40px] leading-[1.1] font-light tracking-[-0.02em] md:text-[56px] md:leading-[62px]'>
              Hack4Impact
            </span>
            <span className='block font-serif text-[40px] leading-[1.1] font-light tracking-[-0.02em] text-blue-500 italic md:text-[56px] md:leading-[62px]'>
              {chapter.university}
            </span>
          </h1>
        </div>

        {chapterImage && (
          <div className='absolute inset-y-0 right-0 hidden w-1/3 md:block'>
            <Image
              fill
              className='object-cover object-[center_30%]'
              src={chapterImage}
              alt={`${chapter.name} chapter`}
              sizes='53vw'
            />
          </div>
        )}
      </section>

      {/* Stats bar */}
      <StatBar
        stats={[
          {
            label: 'Status',
            value: chapter.status ? (
              <span
                className={cn(
                  'rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.1em] uppercase',
                  chapter.status === 'Active'
                    ? 'badge-active'
                    : chapter.status === 'Forming'
                      ? 'badge-founding'
                      : 'bg-gray-5 text-gray-3',
                )}
              >
                {chapter.status}
              </span>
            ) : (
              '—'
            ),
          },
          { label: 'Year Founded', value: chapter.founded || '—' },
          { label: 'Active Members', value: chapter.memberCount },
          { label: 'Projects Delivered', value: chapter.projectCount },
          ...(chapter.website || chapter.github || chapter.instagram
            ? [
                {
                  label: '',
                  value: (
                    <div className='flex flex-col items-center gap-2'>
                      {chapter.website && (
                        <a
                          href={chapter.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group label text-inverse flex items-center gap-2 transition-colors hover:text-blue-500'
                        >
                          <span>Website</span>
                          <span className='text-gray-3 transition-colors group-hover:text-blue-500'>
                            ↗
                          </span>
                        </a>
                      )}
                      {chapter.github && (
                        <a
                          href={chapter.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group label text-inverse flex items-center gap-2 transition-colors hover:text-blue-500'
                        >
                          <span>GitHub</span>
                          <span className='text-gray-3 transition-colors group-hover:text-blue-500'>
                            ↗
                          </span>
                        </a>
                      )}
                      {chapter.instagram && (
                        <a
                          href={chapter.instagram}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group label text-inverse flex items-center gap-2 transition-colors hover:text-blue-500'
                        >
                          <span>Instagram</span>
                          <span className='text-gray-3 transition-colors group-hover:text-blue-500'>
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
                  ),
                },
              ]
            : []),
        ]}
      />

      {/* Content + Projects */}
      <section className='border-separator border-t px-8 py-8 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <p className='font-serif text-lg md:text-xl'>{chapter.description}</p>
        </div>
      </section>

      {chapterProjects.length > 0 && (
        <section className='px-8 pb-12 md:px-16'>
          <div className='mx-auto max-w-[1312px]'>
            <h2 className='mb-6 font-sans text-xl md:text-2xl'>Projects</h2>
            <ProjectsTable
              projects={chapterProjects}
              hideChapterFilter
              showPartner
            />
          </div>
        </section>
      )}
    </>
  )
}
