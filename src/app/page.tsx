import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Heart, OpenBook, Suitcase } from 'iconoir-react'
import { StepsList } from '@/components/ui/StepsList'
import { CTABand } from '@/components/ui/CTABand'
import { HomeIntro } from '@/components/ui/HomeIntro'
import { notionApi, FEATURED_PROJECT_SLUG } from '@/lib/notion'
import { CardGrid } from '@/components/ui/CardGrid'
import { contentfulApi } from '@/lib/contentful'
import { iconProps } from '@/lib/constants'

export default async function HomePage() {
  const [
    programs,
    projects,
    heroImageUrl,
    processImageUrl,
    calloutImageUrl,
    mainProcess,
  ] = await Promise.all([
    contentfulApi.getInfoCards('Programs'),
    notionApi.getProjects(),
    contentfulApi.getAssetUrl('home-one'),
    contentfulApi.getAssetUrl('home-two'),
    contentfulApi.getAssetUrl('home-three'),
    contentfulApi.getProcess('Main Process'),
  ])

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
                  sizes='(max-width: 1024px) calc(100vw - 4rem), (min-width: 1280px) calc(40vw), calc(50vw - 6rem)'
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
        <div className='text-center'>
          <h2 className='font-serif text-3xl md:text-4xl'>Our programs</h2>
          <p className='font-sans text-2xl md:text-3xl'>Community in action</p>
        </div>
        {programs && <CardGrid items={programs.cards} icons={programsIcons} />}
      </section>

      {/* Quote Callout Section */}
      <section className='relative mt-32 flex flex-col lg:flex-row'>
        {/* Left: gradient panel stretches to right panel height */}
        <div
          className='relative flex-shrink-0 lg:w-1/3'
          style={{
            backgroundImage:
              'linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 0%) 0%, oklab(92.7% -0.010 -0.027) 100%)',
          }}
        >
          {calloutImageUrl && (
            <div className='relative mx-8 pt-8 lg:absolute lg:-top-32 lg:bottom-0 lg:left-4 lg:right-4 lg:overflow-hidden lg:pt-0'>
              <Image
                src={calloutImageUrl}
                alt='A group photo of students from the UPenn chapter'
                width={600}
                height={750}
                className='w-full rounded-[5px]'
                style={{ height: 'auto' }}
              />
            </div>
          )}
        </div>

        {/* Right: quote */}
        <div className='flex flex-1 flex-col justify-center bg-bg-subtle px-8 py-12 lg:p-20'>
          <p className='mb-7 font-mono text-[11px] uppercase tracking-[0.12em] text-gray-500'>
            In their words
          </p>
          <blockquote className='font-serif text-[28px] font-light italic leading-[40px] tracking-[-0.01em] text-black'>
            &ldquo;...the kind of passion for socially-minded engineering our
            industry desperately needs.&rdquo;
          </blockquote>
          <div className='mt-8 border-t border-border-subtle pt-6'>
            <p className='font-sans text-[15px] font-medium leading-[18px] text-black'>
              Javid Fathi
            </p>
            <p className='mt-1 font-mono text-[11px] leading-[14px] tracking-[0.06em] text-gray-500'>
              Software Engineer Lead, Microsoft
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

      <CTABand />
    </>
  )
}
