import Link from 'next/link'
import Image from 'next/image'
import { getAssetUrl, getJournalEntries } from '@/lib/contentful/api'
import { CallToAction } from '@/components/ui/CallToAction'
import { JournalEntry } from '@/lib/types'

const thumbnailGradients = [
  'from-orange-100 to-pink-200',
  'from-purple-100 to-blue-200',
  'from-green-100 to-teal-200',
  'from-blue-100 to-indigo-200',
]

export default async function JournalPage() {
  const [journalEntries, journalBanner] = await Promise.all([
    getJournalEntries(),
    getAssetUrl('journal-banner'),
  ])

  return (
    <>
      {/* Banner */}
      <section className='h-56 md:h-80 relative bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100'>
        {journalBanner && (
          <Image
            fill
            src={journalBanner}
            alt='Banner for journal page'
            className='object-cover'
          />
        )}
      </section>

      {/* Content */}
      <section className='p-8 md:p-12'>
        <h1 className='text-3xl md:text-4xl font-sans mb-12 text-center'>
          Journal
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {journalEntries.map((entry: JournalEntry, i: number) => (
            <Link key={entry.id} href={`/journal/${entry.slug}`}>
              <article className='p-2'>
                <div
                  className={`relative aspect-[16/9] mb-4 bg-gradient-to-br ${thumbnailGradients[i % thumbnailGradients.length]}`}
                >
                  {entry.thumbnailUrl || entry.bannerUrl ? (
                    <Image
                      alt='Journal thumbnail image'
                      src={entry.thumbnailUrl || entry.bannerUrl!}
                      fill
                      className='object-cover'
                    />
                  ) : null}
                </div>

                <h2 className='text-xl font-sans mb-2'>{entry.title}</h2>

                <div className='flex items-center gap-2 text-sm font-serif mb-2'>
                  <span className='text-gray-600'>{entry.tag}</span>
                  <span className='text-gray-400'>&middot;</span>
                  <span className='text-gray-600'>{entry.readTime}</span>
                </div>

                <p className='text-base text-gray-700 font-serif'>
                  {entry.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction
        heading='Have a story to share?'
        buttonText='Contact us'
        href='/about'
      />
    </>
  )
}
