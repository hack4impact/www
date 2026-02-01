import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Heart, OpenBook, Suitcase } from 'iconoir-react'
import { NumberedSteps } from '@/components/ui/NumberedSteps'
import { CallToAction } from '@/components/ui/CallToAction'
import { getProjects, FEATURED_PROJECT_SLUG } from '@/lib/notion/api'
import {
  getJournalEntries,
  getAssetUrl,
  getProcess,
} from '@/lib/contentful/api'
import Image from 'next/image'

export default async function HomePage() {
  const [
    projects,
    journalEntries,
    heroImageUrl,
    processImageUrl,
    calloutImageUrl,
    mainProcess,
  ] = await Promise.all([
    getProjects(),
    getJournalEntries(),
    getAssetUrl('home-one'),
    getAssetUrl('home-two'),
    getAssetUrl('home-three'),
    getProcess('Main Process'),
  ])

  const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

  const featuredArticles = journalEntries.slice(0, 3)
  const featuredProject =
    (FEATURED_PROJECT_SLUG &&
      projects.find((p) => p.slug === FEATURED_PROJECT_SLUG)) ||
    projects[0] ||
    null
  return (
    <>
      <section className='relative pb-32'>
        {/* Gradient background */}
        <div className='absolute inset-0 bottom-1/3 bg-gradient-to-b from-blue-100 via-blue-100 via-60% to-green-50' />

        {/* Content */}
        <div className='relative text-center pt-24 px-8'>
          <h1 className='flex flex-col'>
            <span className='font-serif text-5xl '>Code &amp; community</span>
            <span className='font-serif text-5xl '>for the common good</span>
          </h1>
          <p className='mt-4 text-base md:text-lg max-w-2xl mx-auto'>
            Committed to supporting nonprofits and social good initiatives, Hack
            for Impact educates and connects student volunteers, in search of
            real-world experience, with nonprofit partners that address crucial
            community needs.
          </p>
          <div className='mt-6'>
            <Link href='/nonprofits'>
              <Button>Partner with us!</Button>
            </Link>
          </div>
        </div>

        {/* Gradient block below hero */}
        <div className='relative mt-8 flex justify-center px-8'>
          <div className='relative w-full max-w-[800px] aspect-[8/5] bg-gradient-to-br from-blue-200 to-green-100'>
            {heroImageUrl && (
              <Image
                fill
                className='object-cover'
                src={heroImageUrl}
                alt='A group photo of students from the UPenn chapter'
              />
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {mainProcess && (
        <NumberedSteps
          heading='Our process for turning computer science into community science'
          headingClassName='max-w-lg mx-auto'
          steps={mainProcess.steps}
          numbered={mainProcess.numbered}
          aside={
            <div className='relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-gradient-to-br from-purple-100 to-blue-200'>
              {processImageUrl && (
                <Image
                  fill
                  className='object-cover'
                  src={processImageUrl}
                  alt='A group photo of students from the UPenn chapter'
                />
              )}
            </div>
          }
        />
      )}

      {/* Programs Section */}
      <section className='px-8 md:px-12 py-16 md:py-24'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-serif'>Our programs</h2>
          <p className='text-2xl md:text-3xl font-sans'>Community in action</p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='flex flex-col items-start px-6 py-8 bg-blue-50 rounded-lg'>
            <div className='mb-6'>
              <Heart {...iconProps} />
            </div>
            <h3 className='text-xl font-sans mb-2'>Non-Profits</h3>
            <p className='text-base font-serif mb-4'>
              We build custom software solutions for nonprofit organizations,
              helping them better serve their communities and amplify their
              impact.
            </p>
            <Link
              href='/nonprofits'
              className='mt-auto font-mono text-sm hover:underline'
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className='flex flex-col items-start px-6 py-8 bg-blue-50 rounded-lg'>
            <div className='mb-6'>
              <OpenBook {...iconProps} />
            </div>
            <h3 className='text-xl font-sans mb-2'>Students</h3>
            <p className='text-base font-serif mb-4'>
              We provide community, education, and service-learning
              opportunities for students to develop real-world skills while
              making a difference.
            </p>
            <Link
              href='/students'
              className='mt-auto font-mono text-sm hover:underline'
            >
              Learn more &rarr;
            </Link>
          </div>
          <div className='flex flex-col items-start px-6 py-8 bg-blue-50 rounded-lg'>
            <div className='mb-6'>
              <Suitcase {...iconProps} />
            </div>
            <h3 className='text-xl font-sans mb-2'>Professionals</h3>
            <p className='text-base font-serif mb-4'>
              Industry professionals mentor our students, sharing expertise and
              guiding the next generation of socially-conscious technologists.
            </p>
            <Link
              href='/mentors'
              className='mt-auto font-mono text-sm hover:underline'
            >
              Learn more &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Callout Section */}
      <section className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='px-8 lg:px-0 lg:pl-12 py-8 lg:py-12'>
          <div className='aspect-[4/5] w-full bg-gradient-to-br relative from-green-100 to-purple-200'>
            {calloutImageUrl && (
              <Image
                fill
                className='object-cover'
                src={calloutImageUrl}
                alt='A group photo of students from the UPenn chapter'
              />
            )}
          </div>
        </div>

        <div className='flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12'>
          <blockquote className='font-sans text-2xl md:text-3xl'>
            &ldquo;...the kind of passion for socially-minded engineering our
            industry desperately needs.&rdquo;
          </blockquote>
          <div className='mt-6 md:mt-8'>
            <p className='font-sans text-lg'>Javid Fathi</p>
            <p className='font-serif text-gray-600'>
              Software Engineer Lead at Microsoft
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className='px-8 md:px-12 py-16 md:py-24'>
          <h2 className='text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center'>
            Featured project
          </h2>
          <div className='max-w-4xl mx-auto bg-blue-50 rounded-lg grid grid-cols-1 md:grid-cols-2 p-4 md:p-5 gap-4 md:gap-5'>
            <div className='aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200 rounded-md' />
            <div className='flex flex-col justify-center p-2 md:p-3'>
              <h3 className='font-sans text-xl md:text-2xl mb-3'>
                {featuredProject.title}
              </h3>
              <p className='font-serif text-gray-600 mb-6'>
                {featuredProject.description}
              </p>
              <div>
                <Link href={`/projects/${featuredProject.slug}`}>
                  <Button>View write-up</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      <section className='px-8 md:px-12 py-16 md:py-24'>
        <h2 className='text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center'>
          Featured articles
        </h2>
        <div className='max-w-2xl mx-auto divide-y divide-gray-200 border-y border-gray-200'>
          {featuredArticles.map((entry, i) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.slug}`}
              className='block'
            >
              <div className='py-6 flex gap-6 items-center'>
                <div
                  className={`w-48 h-28 shrink-0 bg-gradient-to-br ${
                    i === 0
                      ? 'from-orange-100 to-pink-200'
                      : 'from-purple-100 to-blue-200'
                  }`}
                />
                <div className='min-w-0'>
                  <h3 className='font-sans text-lg mb-1 truncate'>
                    {entry.title}
                  </h3>
                  <div className='flex items-center gap-2 text-sm font-serif text-gray-600'>
                    <span>{entry.tag}</span>
                    <span className='text-gray-400'>&middot;</span>
                    <span>{entry.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='text-center mt-8'>
          <Link href='/journal'>
            <Button>View all articles</Button>
          </Link>
        </div>
      </section>

      <CallToAction
        heading='Ready to make an impact?'
        buttonText='Get involved'
        href='/students'
      />
    </>
  )
}
