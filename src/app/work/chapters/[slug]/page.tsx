import { notFound } from 'next/navigation'
import { notionApi } from '@/lib/notion'
import { ProjectsTable } from '@/components/ui/ProjectsTable'
import { contentfulApi } from '@/lib/contentful'
import Image from 'next/image'
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
      <section
        className='relative overflow-hidden border-b border-border-subtle px-8 pb-14 pt-16 md:px-16'
        style={{
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(59.6% -0.045 -0.169 / 10%) 0%, oklab(0% 0 0 / 0%) 60%)',
          backgroundOrigin: 'border-box',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <p className='mb-6 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
            Our Chapters
          </p>
          <h1>
            <span className='block font-serif text-[40px] leading-[1.1] font-light tracking-[-0.02em] text-black md:text-[56px] md:leading-[62px]'>
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
      <section className='px-8 md:px-16'>
        <div className='mx-auto flex max-w-[1312px]'>
          {/* Status */}
          <div
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-2 py-7',
              (chapter.website || chapter.github || chapter.instagram) &&
                'border-r border-border-subtle',
            )}
          >
            {chapter.status ? (
              <span
                className={[
                  'rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.1em] uppercase',
                  chapter.status === 'Active'
                    ? 'bg-green-50 text-green-600'
                    : chapter.status === 'Forming'
                      ? 'bg-orange-50 text-orange-600'
                      : 'bg-gray-100 text-gray-500',
                ].join(' ')}
              >
                {chapter.status}
              </span>
            ) : (
              <span className='font-serif text-[32px] leading-[40px] font-light tracking-[-0.01em] text-black'>
                —
              </span>
            )}
            <span className='font-mono text-[11px] tracking-[0.1em] text-gray-500 uppercase'>
              Status
            </span>
          </div>

          {[
            { value: chapter.founded || '—', label: 'Year Founded' },
            { value: chapter.memberCount, label: 'Active Members' },
            { value: chapter.projectCount, label: 'Projects Delivered' },
          ].map((stat) => (
            <div
              key={stat.label}
              className='flex flex-1 flex-col items-center justify-center gap-1.5 border-r border-border-subtle py-7'
            >
              <span className='font-serif text-[32px] leading-[40px] font-light tracking-[-0.01em] text-black'>
                {stat.value}
              </span>
              <span className='font-mono text-[11px] tracking-[0.1em] text-gray-500 uppercase'>
                {stat.label}
              </span>
            </div>
          ))}

          {/* Links */}
          {(chapter.website || chapter.github || chapter.instagram) && (
            <div className='flex flex-1 flex-col items-center justify-center gap-2 py-7'>
              {chapter.website && (
                <a
                  href={chapter.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-black uppercase transition-colors hover:text-blue-500'
                >
                  <span>Website</span>
                  <span className='text-gray-400 transition-colors group-hover:text-blue-500'>
                    ↗
                  </span>
                </a>
              )}
              {chapter.github && (
                <a
                  href={chapter.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-black uppercase transition-colors hover:text-blue-500'
                >
                  <span>GitHub</span>
                  <span className='text-gray-400 transition-colors group-hover:text-blue-500'>
                    ↗
                  </span>
                </a>
              )}
              {chapter.instagram && (
                <a
                  href={chapter.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-black uppercase transition-colors hover:text-blue-500'
                >
                  <span>Instagram</span>
                  <span className='text-gray-400 transition-colors group-hover:text-blue-500'>
                    ↗
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content + Projects */}
      <section className='border-t border-border-subtle px-8 py-8 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <p className='font-serif text-lg md:text-xl'>{chapter.description}</p>
        </div>
      </section>

      {chapterProjects.length > 0 && (
        <section className='px-8 pb-12 md:px-16'>
          <div className='mx-auto max-w-[1312px]'>
            <h2 className='mb-6 font-sans text-xl md:text-2xl'>Projects</h2>
            <ProjectsTable projects={chapterProjects} hideChapterFilter />
          </div>
        </section>
      )}
    </>
  )
}
