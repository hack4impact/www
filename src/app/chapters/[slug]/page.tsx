import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Separator } from '@base-ui/react/separator'
import { notionApi } from '@/lib/notion'
import { ChapterProjects } from '@/components/ui/ChapterProjects'
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
      {/* Intro - Two column */}
      <section className='grid min-h-[50vh] grid-cols-1 md:grid-cols-2'>
        <div className='relative aspect-[4/3] min-h-64 bg-gradient-to-br from-green-100 to-blue-200 md:aspect-auto md:min-h-0'>
          {chapterImage && (
            <Image
              fill
              className='object-cover object-top pt-5'
              src={chapterImage}
              alt={`An image of ${chapter.name}'s student volunteers`}
            />
          )}
        </div>

        {/* Header content */}
        <div className='flex flex-col items-start justify-center bg-[#FCF9F2] p-8 md:p-12'>
          <div className='mb-2 flex items-center gap-2 font-serif text-base'>
            <span className='text-gray-600'>{chapter.location}</span>
            {chapter.location && chapter.founded && (
              <span className='text-gray-400'>·</span>
            )}
            {chapter.founded && (
              <span className='text-gray-600'>Est. {chapter.founded}</span>
            )}
          </div>
          <h1 className='max-w-lg font-sans text-3xl md:text-5xl'>
            {chapter.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className='p-8 md:px-24 md:py-12'>
        {/* Back link */}
        <div className='mb-8'>
          <Link
            href='/chapters'
            className='inline-flex items-center gap-2 font-sans text-gray-600 hover:text-gray-900'
          >
            <span>←</span>
            <span>Back to chapters</span>
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] lg:gap-16'>
          {/* Sidebar - Stats */}
          <aside className='flex flex-row gap-8 font-serif lg:flex-col lg:gap-0 lg:pr-8'>
            <div className='lg:mb-6'>
              <p className='text-sm text-gray-500'>Members</p>
              <p className='font-sans text-2xl'>{chapter.memberCount}</p>
            </div>
            <div className='lg:mb-6'>
              <p className='text-sm text-gray-500'>Projects</p>
              <p className='font-sans text-2xl'>{chapter.projectCount}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>University</p>
              <p className='font-sans'>{chapter.university}</p>
            </div>
          </aside>

          {/* Main content */}
          <article className='font-serif'>
            {/* Description */}
            <p className='mb-8 text-lg md:text-xl'>{chapter.description}</p>

            {/* Divider */}
            <Separator className='mb-8 border-t border-gray-300' />

            {/* Link Cards */}
            {(chapter.website || chapter.github || chapter.instagram) && (
              <div className='mb-8 flex flex-wrap gap-4'>
                {chapter.website && (
                  <LinkCard
                    label='Website'
                    href={chapter.website}
                    className='flex-1'
                  />
                )}
                {chapter.github && (
                  <LinkCard
                    label='GitHub'
                    href={chapter.github}
                    className='flex-1'
                  />
                )}
                {chapter.instagram && (
                  <LinkCard
                    label='Instagram'
                    href={chapter.instagram}
                    className='flex-1'
                  />
                )}
              </div>
            )}

            {/* Projects Table */}
            {chapterProjects.length > 0 && (
              <>
                <Separator className='mb-8 border-t border-gray-300' />
                <h2 className='mb-4 font-sans text-xl md:text-2xl'>Projects</h2>
                <ChapterProjects projects={chapterProjects} />
              </>
            )}
          </article>
        </div>
      </section>
    </>
  )
}
