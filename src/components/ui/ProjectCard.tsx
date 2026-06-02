import Link from 'next/link'
import type { Project } from '@/lib/types/project'

const TOP_COLORS = ['bg-blue-50', 'bg-violet-50', 'bg-green-50']

interface ProjectCardProps {
  project: Project
  colorIndex: number
}

export function ProjectCard({ project, colorIndex }: ProjectCardProps) {
  const topColor = TOP_COLORS[colorIndex % 3]
  const meta = [project.chapter, project.year].filter(Boolean).join(' · ')
  const teamCount = project.team.length

  return (
    <Link
      href={`/work/projects/${project.slug}`}
      className='group flex flex-col overflow-hidden rounded-xl border border-[#E8E8E4] bg-white transition-colors hover:border-gray-300'
    >
      <div className={`h-24 flex-shrink-0 ${topColor}`} />

      <div className='flex flex-1 flex-col p-3.5'>
        {meta && (
          <p className='mb-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-gray-400'>
            {meta}
          </p>
        )}
        <p className='flex-1 font-sans text-sm font-medium leading-snug text-black'>
          {project.title}
        </p>
        <div className='mt-3 flex items-center justify-between'>
          {teamCount > 0 ? (
            <p className='font-mono text-[9px] uppercase tracking-[0.06em] text-gray-400'>
              Built by {teamCount} students
            </p>
          ) : (
            <span />
          )}
          <span className='font-mono text-[9px] uppercase tracking-[0.06em] text-blue-500 transition-colors group-hover:text-blue-600'>
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}
