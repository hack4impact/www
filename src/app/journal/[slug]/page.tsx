import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Separator } from '@base-ui/react/separator'
import { contentfulApi } from '@/lib/contentful'
import { RichText } from '@/components/ui/RichText'

interface JournalPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function JournalPostPage({
  params,
}: JournalPostPageProps) {
  const { slug } = await params
  const entry = await contentfulApi.getJournalEntryBySlug(slug)

  if (!entry) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className='p-8 text-center md:px-24 md:py-12'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-2 flex items-center justify-center gap-2 font-serif text-base'>
            <span className='text-gray-600'>{entry.tag}</span>
            <span className='text-gray-400'>&middot;</span>
            <span className='text-gray-600'>{entry.readTime}</span>
          </div>
          <h1 className='mx-auto font-sans text-3xl md:text-5xl'>
            {entry.title}
          </h1>
        </div>
      </section>

      {/* Banner Image */}
      <section className='px-8 md:px-12'>
        <div className='relative aspect-[3/1] w-full bg-gradient-to-br from-blue-100 to-green-200'>
          {entry.thumbnailUrl || entry.bannerUrl ? (
            <Image
              src={entry.thumbnailUrl || entry.bannerUrl!}
              alt={entry.title}
              fill
              className='object-cover'
            />
          ) : null}
        </div>
      </section>

      {/* Content */}
      <section className='p-8 md:px-24 md:py-12'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] lg:gap-24'>
          {/* Sidebar - Author & Date */}
          <aside className='grid grid-cols-2 font-serif lg:block lg:pr-8'>
            <div className='mb-0 lg:mb-4'>
              <p className='text-sm text-gray-500'>Written by</p>
              <p className='font-sans'>{entry.author}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Published</p>
              <p className='font-sans'>{entry.publishedDate}</p>
            </div>
          </aside>

          {/* Article content */}
          <article className='font-serif'>
            {/* Intro */}
            <p className='mb-6 text-lg md:text-xl'>{entry.intro}</p>

            {/* Divider */}
            <Separator className='mb-6 border-t border-gray-300' />

            {/* Content */}
            <div className='max-w-none'>
              <RichText document={entry.content} />
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
