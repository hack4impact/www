import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Separator } from '@base-ui/react/separator'
import { getJournalEntryBySlug } from '@/lib/contentful/api'
import { RichText } from '@/components/ui/RichText'

interface JournalPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function JournalPostPage({
  params,
}: JournalPostPageProps) {
  const { slug } = await params
  const entry = await getJournalEntryBySlug(slug)

  if (!entry) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className='p-8 md:px-24 md:py-12 text-center'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-center gap-2 text-base font-serif mb-2'>
            <span className='text-gray-600'>{entry.tag}</span>
            <span className='text-gray-400'>&middot;</span>
            <span className='text-gray-600'>{entry.readTime}</span>
          </div>
          <h1 className='text-3xl md:text-5xl font-sans mx-auto'>
            {entry.title}
          </h1>
        </div>
      </section>

      {/* Banner Image */}
      <section className='px-8 md:px-12'>
        <div className='relative w-full aspect-[3/1] bg-gradient-to-br from-blue-100 to-green-200'>
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
        <div className='grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-24'>
          {/* Sidebar - Author & Date */}
          <aside className='grid grid-cols-2 lg:block lg:pr-8 font-serif'>
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
            <p className='text-lg md:text-xl mb-6'>{entry.intro}</p>

            {/* Divider */}
            <Separator className='border-t border-gray-300 mb-6' />

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
