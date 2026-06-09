import { notFound } from 'next/navigation'
import Link from 'next/link'
import { notionApi } from '@/lib/notion'
import { cn } from '@/lib/utils'
import { ActionBand } from '@/components/ui/ActionBand'
import type { ProjectSection } from '@/lib/types/project'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

function SectionRenderer({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case 'text':
      return (
        <div className='mb-8'>
          <h3 className='mt-8 mb-4 font-sans text-xl md:text-2xl'>
            {section.title}
          </h3>
          <p className='text-gray-3 font-sans text-[17px] leading-[28px]'>
            {section.content}
          </p>
        </div>
      )
    case 'image':
      return (
        <figure className='mb-8'>
          <div className='aspect-[16/9] w-full bg-gradient-to-br from-gray-100 to-gray-200' />
          {section.caption && (
            <figcaption className='mt-2 font-serif text-sm text-gray-500'>
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'two-column':
      return (
        <div
          className={cn(
            'mb-8 grid grid-cols-1 gap-8 md:grid-cols-2',
            section.imagePosition === 'right'
              ? ''
              : 'md:[&>*:first-child]:order-2',
          )}
        >
          <div className='flex items-center'>
            <p className='text-gray-3 font-sans text-[17px] leading-[28px]'>
              {section.text}
            </p>
          </div>
          <div className='aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200' />
        </div>
      )
    case 'image-grid':
      return (
        <div className='mb-8 grid grid-cols-2 gap-4'>
          {Array.from({ length: section.count }, (_, index) => (
            <div
              key={index}
              className='aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200'
            />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await notionApi.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const terms = project.duration
    ? project.duration
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []
  const semesterRange =
    terms.length === 0
      ? null
      : terms.length === 1
        ? terms[0]
        : `${terms[0]} – ${terms[terms.length - 1]}`

  return (
    <>
      {/* Page header */}
      <section className='gradient-bl-green border-separator relative overflow-hidden border-b px-8 pt-16 pb-14 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex items-center justify-between pb-6'>
            <p className='label text-green-600'>Our Work</p>
            {project.tag && (
              <span className='badge-active rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.1em] uppercase'>
                {project.tag}
              </span>
            )}
          </div>
          <h1 className='pb-5'>
            <span className='text-inverse block font-serif text-[40px] leading-[1.1] font-light tracking-[-0.02em] md:text-[56px] md:leading-[62px]'>
              {project.title}
            </span>
          </h1>
          {project.partner && (
            <p className='text-gray-3 font-sans text-[15px] leading-[22px]'>
              For {project.partner}
            </p>
          )}
        </div>
      </section>

      {/* Overview */}
      <section className='border-separator bg-root border-b px-8 py-16 md:px-16 md:py-20'>
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex flex-col items-start gap-16 md:flex-row md:gap-20'>
            {/* Article */}
            <div className='flex min-w-0 flex-1 flex-col'>
              <p className='label pb-6 text-green-600'>About the project</p>
              {project.description && (
                <p className='text-gray-3 pb-7 font-sans text-[17px] leading-[28px]'>
                  {project.description}
                </p>
              )}
              <div className='flex flex-col gap-4'>
                {project.intro && (
                  <p className='text-gray-3 font-sans text-[17px] leading-[28px]'>
                    {project.intro}
                  </p>
                )}
                {project.sections.map((section, i) => (
                  <SectionRenderer key={i} section={section} />
                ))}
              </div>
            </div>

            {/* Metadata sidebar */}
            <div className='relative w-full shrink-0 md:w-[30%]'>
              <div className='border-separator bg-panel relative rounded border'>
                {project.partner && (
                  <div className='border-separator flex flex-col gap-1.5 border-b px-7 py-6'>
                    <span className='label-xs text-gray-4'>Nonprofit</span>
                    <span className='text-inverse font-serif text-[15px] leading-[22px] font-light'>
                      {project.partner}
                    </span>
                  </div>
                )}
                <div className='border-separator flex flex-col gap-1.5 border-b px-7 py-6'>
                  <span className='label-xs text-gray-4'>Chapter</span>
                  <span className='text-inverse font-serif text-[15px] leading-[22px] font-light'>
                    {project.chapter}
                  </span>
                </div>
                <div className='border-separator flex flex-col gap-1.5 border-b px-7 py-6'>
                  <span className='label-xs text-gray-4'>Semester</span>
                  <span className='text-inverse font-serif text-[15px] leading-[22px] font-light'>
                    {semesterRange || project.duration || '—'}
                  </span>
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className='border-separator flex flex-col gap-1.5 border-b px-7 py-6'>
                    <span className='label-xs text-gray-4'>Tech Stack</span>
                    <span className='text-inverse font-serif text-[15px] leading-[22px] font-light'>
                      {project.technologies.join(' · ')}
                    </span>
                  </div>
                )}
                {(project.website || project.github) && (
                  <div className='border-separator flex flex-col gap-3 border-b px-7 py-6'>
                    <span className='label-xs text-gray-4'>Links</span>
                    <div className='flex flex-col gap-2'>
                      {project.website && (
                        <a
                          href={project.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group label text-inverse flex items-center gap-1.5 transition-colors hover:text-green-600'
                        >
                          <span>Website</span>
                          <span className='text-gray-3 transition-colors group-hover:text-green-600'>
                            ↗
                          </span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='group label text-inverse flex items-center gap-1.5 transition-colors hover:text-green-600'
                        >
                          <span>GitHub</span>
                          <span className='text-gray-3 transition-colors group-hover:text-green-600'>
                            ↗
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <ActionBand />
    </>
  )
}
