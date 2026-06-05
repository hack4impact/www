import Link from 'next/link'
import type { Project } from '@/lib/types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const meta = [project.chapter, project.year].filter(Boolean).join(' · ')
  const teamCount = project.team.length

  return (
    <Link
      href={`/work/projects/${project.slug}`}
      className='group flex h-full flex-col overflow-hidden rounded-xl border border-separator bg-root p-3.5 transition-colors hover:border-gray-4'
    >
      {meta && (
        <p className='mb-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-gray-3'>
          {meta}
        </p>
      )}
      <p className='flex-1 font-sans text-sm font-medium leading-snug text-inverse'>
        {project.title}
      </p>
      <div className='mt-3 flex items-center justify-between'>
        {teamCount > 0 ? (
          <p className='font-mono text-[9px] uppercase tracking-[0.06em] text-gray-3'>
            Built by {teamCount} {teamCount === 1 ? 'student' : 'students'}
          </p>
        ) : null}
        <span className='font-mono text-[9px] uppercase tracking-[0.06em] text-blue-500 transition-colors group-hover:text-blue-600'>
          View →
        </span>
      </div>
    </Link>
  )
}
