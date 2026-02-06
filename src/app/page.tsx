import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Heart, OpenBook, Suitcase } from 'iconoir-react'
import { StepsList } from '@/components/ui/StepsList'
import { CallToAction } from '@/components/ui/CallToAction'
import { HomeIntro } from '@/components/ui/HomeIntro'
import { notionApi, FEATURED_PROJECT_SLUG } from '@/lib/notion'
import { CardGrid } from '@/components/ui/CardGrid'
import { contentfulApi } from '@/lib/contentful'

export default async function HomePage() {
  const [
    programs,
    projects,
    featuredArticles,
    heroImageUrl,
    processImageUrl,
    calloutImageUrl,
    mainProcess,
  ] = await Promise.all([
    contentfulApi.getInfoCards('Programs'),
    notionApi.getProjects(),
    contentfulApi.getPaginatedJournalEntries({ limit: 3, skip: 0 }),
    contentfulApi.getAssetUrl('home-one'),
    contentfulApi.getAssetUrl('home-two'),
    contentfulApi.getAssetUrl('home-three'),
    contentfulApi.getProcess('Main Process'),
  ])

  const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const
  const programsIcons = {
    Heart: <Heart {...iconProps} />,
    OpenBook: <OpenBook {...iconProps} />,
    Suitcase: <Suitcase {...iconProps} />,
  }

  const featuredProject =
    (FEATURED_PROJECT_SLUG &&
      projects.find((p) => p.slug === FEATURED_PROJECT_SLUG)) ||
    projects[0] ||
    null

  return (
    <>
      <HomeIntro heroImageUrl={heroImageUrl ?? undefined} />

      {/* Process Section */}
      {mainProcess && (
        <section className='px-8 py-16 md:px-12 md:py-24 xl:mx-auto xl:max-w-[80vw]'>
          <h2 className='mx-auto mb-12 max-w-lg text-center font-sans text-2xl md:text-3xl'>
            {mainProcess.title!}
          </h2>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            <div className='relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-blue-200 lg:aspect-auto'>
              {processImageUrl && (
                <Image
                  fill
                  className='object-cover'
                  src={processImageUrl}
                  alt='A group photo of students from the Cal Poly chapter'
                />
              )}
            </div>
            <StepsList
              steps={mainProcess.steps}
              numbered={mainProcess.numbered}
              stretch
            />
          </div>
        </section>
      )}

      {/* Programs Section */}
      <section className='px-8 py-16 md:px-12 md:py-24 xl:mx-auto xl:max-w-[80vw]'>
        <div className='mb-0 text-center'>
          <h2 className='font-serif text-3xl md:text-4xl'>Our programs</h2>
          <p className='font-sans text-2xl md:text-3xl'>Community in action</p>
        </div>
        {programs && <CardGrid items={programs.cards} icons={programsIcons} />}
      </section>

      {/* Quote Callout Section */}
      <section className='grid grid-cols-1 lg:grid-cols-2 xl:mx-auto xl:max-w-[80vw]'>
        <div className='px-8 py-8 lg:px-0 lg:py-12 lg:pl-12'>
          <div className='relative aspect-[4/5] w-full bg-gradient-to-br from-green-100 to-purple-200'>
            {calloutImageUrl && (
              <Image
                fill
                className='object-cover object-top pt-8'
                src={calloutImageUrl}
                alt='A group photo of students from the UPenn chapter'
              />
            )}
          </div>
        </div>

        <div className='flex flex-col items-start justify-center p-8 lg:px-24 lg:py-12'>
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
        <section className='px-8 py-16 md:px-12 md:py-24'>
          <h2 className='mb-8 text-center font-sans text-2xl md:mb-12 md:text-3xl'>
            Featured project
          </h2>
          <div className='mx-auto grid max-w-4xl grid-cols-1 gap-4 rounded-lg bg-blue-50 p-4 md:grid-cols-2 md:gap-5 md:p-5'>
            <div className='aspect-[4/3] rounded-md bg-gradient-to-br from-blue-100 to-purple-200' />
            <div className='flex flex-col justify-center p-2 md:p-3'>
              <h3 className='mb-3 font-sans text-xl md:text-2xl'>
                {featuredProject.title}
              </h3>
              <p className='mb-6 font-serif text-gray-600'>
                {featuredProject.description}
              </p>
              <div>
                <Link href={`/work/projects/${featuredProject.slug}`}>
                  <Button>View project</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      <section className='px-8 py-16 md:px-12 md:py-24'>
        <h2 className='mb-8 text-center font-sans text-2xl md:mb-12 md:text-3xl'>
          Featured articles
        </h2>
        <div className='mx-auto max-w-2xl divide-y divide-gray-200 border-y border-gray-200'>
          {featuredArticles.map((entry, i) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.slug}`}
              className='block'
            >
              <div className='flex items-center gap-6 py-6'>
                <div
                  className={`relative h-28 w-48 shrink-0 bg-gradient-to-br ${
                    i === 0
                      ? 'from-orange-100 to-pink-200'
                      : 'from-purple-100 to-blue-200'
                  }`}
                >
                  {entry.thumbnailUrl ||
                    (entry.bannerUrl && (
                      <Image
                        src={entry.thumbnailUrl || entry.bannerUrl}
                        alt='Thumnail image of a journal entry and article'
                        fill
                        className='object-cover'
                      />
                    ))}
                </div>
                <div className='min-w-0'>
                  <h3 className='mb-1 truncate font-sans text-lg'>
                    {entry.title}
                  </h3>
                  <div className='flex items-center gap-2 font-serif text-sm text-gray-600'>
                    <span>{entry.tag}</span>
                    <span className='text-gray-400'>&middot;</span>
                    <span>{entry.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='mt-8 text-center'>
          <Link href='/journal'>
            <Button>View all articles</Button>
          </Link>
        </div>
      </section>

      <CallToAction
        heading='Ready to make an impact?'
        buttonText='Get involved'
        href='/get-involved/students'
      />
    </>
  )
}
