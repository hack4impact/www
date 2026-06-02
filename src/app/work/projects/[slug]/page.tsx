import { notFound } from 'next/navigation'
import Link from 'next/link'
import { notionApi } from '@/lib/notion'
import { PageHeader } from '@/components/ui/PageHeader'
import { cn } from '@/lib/utils'
import type { TeamMember, ProjectSection } from '@/lib/types/project'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

function SectionRenderer({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case 'text':
      return (
        <div className='mb-8'>
          <h3 className='mb-4 mt-8 font-sans text-xl md:text-2xl'>
            {section.title}
          </h3>
          <p className='font-sans text-[17px] leading-[28px] text-text-muted'>
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
            <p className='font-sans text-[17px] leading-[28px] text-text-muted'>
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

const ROLE_ORDER = ['Tech Lead', 'Project Manager', 'Designer', 'Developer']
const AVATAR_COLORS = ['#D9E9FA', '#E2FBDB', '#E8E5FC']

function sortTeamByRole(team: TeamMember[]): TeamMember[] {
  return [...team].sort((a, b) => {
    const ai = ROLE_ORDER.indexOf(a.role)
    const bi = ROLE_ORDER.indexOf(b.role)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await notionApi.getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const sortedTeam = sortTeamByRole(project.team)
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

  const teamTotal = sortedTeam.length
  const COLS = 3
  const lastRowStart = teamTotal - ((teamTotal % COLS) || COLS)

  return (
    <>
      <PageHeader label='Our Work' title={project.title}>
        {project.partner && (
          <p className='font-sans text-[15px] leading-[22px] text-gray-500'>
            For {project.partner}
          </p>
        )}
      </PageHeader>

      {/* Overview */}
      <section className='border-b border-border-subtle bg-white px-8 py-16 md:px-16 md:py-20'>
        <div className='mx-auto flex max-w-[1312px] flex-col items-start gap-16 md:flex-row md:gap-20'>
          {/* Article */}
          <div className='flex min-w-0 flex-1 flex-col'>
            <p className='pb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-green-600'>
              About the project
            </p>
            {project.description && (
              <p className='pb-7 font-sans text-[17px] leading-[28px] text-text-muted'>
                {project.description}
              </p>
            )}
            <div className='flex flex-col gap-4'>
              {project.intro && (
                <p className='font-sans text-[17px] leading-[28px] text-text-muted'>
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
            <div className='relative border border-border-subtle bg-bg-subtle'>
              <div className='absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-[1px] bg-border-decorative' />
              <div className='absolute -right-[5px] -top-[5px] h-[10px] w-[10px] rounded-[1px] bg-border-decorative' />
              <div className='absolute -bottom-[5px] -left-[5px] h-[10px] w-[10px] rounded-[1px] bg-border-decorative' />
              <div className='absolute -bottom-[5px] -right-[5px] h-[10px] w-[10px] rounded-[1px] bg-border-decorative' />

              {project.partner && (
                <div className='flex flex-col gap-1.5 border-b border-border-subtle px-7 py-6'>
                  <span className='font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim'>
                    Nonprofit
                  </span>
                  <span className='font-serif text-[15px] font-light leading-[22px] text-black'>
                    {project.partner}
                  </span>
                </div>
              )}
              <div className='flex flex-col gap-1.5 border-b border-border-subtle px-7 py-6'>
                <span className='font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim'>
                  Chapter
                </span>
                <span className='font-serif text-[15px] font-light leading-[22px] text-black'>
                  {project.chapter}
                </span>
              </div>
              <div className='flex flex-col gap-1.5 border-b border-border-subtle px-7 py-6'>
                <span className='font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim'>
                  Semester
                </span>
                <span className='font-serif text-[15px] font-light leading-[22px] text-black'>
                  {semesterRange || project.duration || '—'}
                </span>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className='flex flex-col gap-1.5 border-b border-border-subtle px-7 py-6'>
                  <span className='font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim'>
                    Tech Stack
                  </span>
                  <span className='font-serif text-[15px] font-light leading-[22px] text-black'>
                    {project.technologies.join(' · ')}
                  </span>
                </div>
              )}
              {(project.website || project.github) && (
                <div className='flex flex-col gap-3 border-b border-border-subtle px-7 py-6'>
                  <span className='font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim'>
                    Links
                  </span>
                  <div className='flex flex-col gap-2'>
                    {project.website && (
                      <a
                        href={project.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-black transition-colors hover:text-green-600'
                      >
                        <span>Website</span>
                        <span className='text-gray-400 transition-colors group-hover:text-green-600'>
                          ↗
                        </span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-black transition-colors hover:text-green-600'
                      >
                        <span>GitHub</span>
                        <span className='text-gray-400 transition-colors group-hover:text-green-600'>
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
      </section>

      {/* Team */}
      {teamTotal > 0 && (
        <section className='border-b border-border-subtle bg-white px-8 py-16 md:px-16 md:py-20'>
          <div className='mx-auto max-w-[1312px]'>
            <div className='flex items-baseline justify-between border-b border-border-subtle pb-10'>
              <div className='flex flex-col gap-1.5'>
                <p className='font-mono text-[11px] uppercase tracking-[0.12em] text-green-600'>
                  Project Team
                </p>
                <h2 className='font-serif text-[32px] font-light leading-[42px] tracking-[-0.01em] text-black md:text-[36px]'>
                  The students who built it
                </h2>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              {sortedTeam.map((member, i) => {
                const isLastItem = i === teamTotal - 1
                const isLastInRow = (i + 1) % COLS === 0 || isLastItem
                const isInLastRow = i >= lastRowStart
                return (
                  <div
                    key={member.name}
                    className={cn(
                      'flex items-start gap-[18px] p-7',
                      !isLastItem && 'border-b border-border-subtle',
                      !isLastInRow && 'md:border-r md:border-border-subtle',
                      !isInLastRow
                        ? 'md:border-b md:border-border-subtle'
                        : !isLastItem
                          ? 'md:border-b-0'
                          : '',
                    )}
                  >
                    <div
                      className='flex h-12 w-12 shrink-0 items-center justify-center'
                      style={{
                        backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
                      }}
                    >
                      <span
                        className='font-serif text-[26px] font-light leading-none'
                        style={{ color: '#247EE4' }}
                      >
                        {member.name[0]?.toUpperCase() ?? '?'}
                      </span>
                    </div>
                    <div className='flex flex-col gap-[5px] pt-1'>
                      <span className='font-sans text-[15px] leading-[18px] text-black'>
                        {member.name}
                      </span>
                      <span
                        className='self-start rounded-full bg-blue-50 px-2 py-[3px] font-mono text-[10px] uppercase leading-3 tracking-[0.1em]'
                        style={{ color: '#247EE4' }}
                      >
                        {member.role}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Band */}
      <section className='border-t border-border-subtle bg-bg-cta px-8 py-16 md:px-16 md:py-20'>
        <div className='mx-auto flex max-w-[1312px] flex-col gap-12 md:flex-row md:gap-0'>
          <div className='flex flex-1 flex-col gap-7 md:border-r md:border-border-subtle md:pr-14'>
            <div className='flex flex-col gap-2.5'>
              <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-blue-500'>
                For Students
              </p>
              <p className='font-serif text-[28px] font-light italic leading-[120%] text-black md:text-[30px]'>
                Code for communities.
              </p>
              <p className='font-sans text-[15px] leading-[155%] text-gray-500'>
                Join a chapter, work on real projects, and build technology that
                makes a difference.
              </p>
            </div>
            <Link
              href='/get-involved/students'
              className='font-sans text-[14px] font-semibold leading-[18px] text-blue-500'
            >
              Join a chapter →
            </Link>
          </div>
          <div className='flex flex-1 flex-col gap-7 md:border-r md:border-border-subtle md:px-14'>
            <div className='flex flex-col gap-2.5'>
              <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-green-600'>
                For Nonprofits
              </p>
              <p className='font-serif text-[28px] font-light italic leading-[120%] text-black md:text-[30px]'>
                Work with students.
              </p>
              <p className='font-sans text-[15px] leading-[155%] text-gray-500'>
                Get a dedicated student team to build the tool your mission
                needs — at no cost.
              </p>
            </div>
            <Link
              href='/get-involved/nonprofits'
              className='font-sans text-[14px] font-semibold leading-[18px] text-green-600'
            >
              Submit a project →
            </Link>
          </div>
          <div className='flex flex-1 flex-col gap-7 md:pl-14'>
            <div className='flex flex-col gap-2.5'>
              <p className='font-mono text-[10px] uppercase tracking-[0.12em] text-purple-500'>
                For Mentors & Sponsors
              </p>
              <p className='font-serif text-[28px] font-light italic leading-[120%] text-black md:text-[30px]'>
                Support the mission.
              </p>
              <p className='font-sans text-[15px] leading-[155%] text-gray-500'>
                Guide student teams, fund chapters, or partner with us to grow
                our reach.
              </p>
            </div>
            <Link
              href='/get-involved/mentors'
              className='font-sans text-[14px] font-semibold leading-[18px] text-purple-500'
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

