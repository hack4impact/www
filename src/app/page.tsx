import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Heart, OpenBook, Suitcase } from 'iconoir-react'
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
        <section className='flex flex-col gap-12 border-t border-border-subtle px-8 py-16 md:flex-row md:items-center md:gap-20 md:px-16 md:py-20'>
          {/* Left: image with decorative frame */}
          <div className='relative shrink-0'>
            <div
              className='relative w-full overflow-hidden rounded-[5px] border border-border-subtle md:w-[480px]'
              style={{
                aspectRatio: '480 / 420',
                backgroundImage:
                  'linear-gradient(in oklab 0deg, oklab(97% -0.022 0.020) 0%, oklab(100% 0 0 / 0%) 95%)',
              }}
            >
              {processImageUrl && (
                <Image
                  fill
                  src={processImageUrl}
                  alt='Students working together on a nonprofit project'
                  className='object-cover'
                  sizes='(max-width: 768px) calc(100vw - 4rem), 480px'
                />
              )}
              <div className='pointer-events-none absolute bottom-0 left-1/2 h-2/3 w-[110%] -translate-x-1/2 bg-[#E2DED6] mix-blend-luminosity' />
            </div>
            <div className='absolute -top-[5px] -left-[5px] size-[10px] rounded-[1px] bg-gray-300' />
            <div className='absolute -top-[5px] -right-[5px] size-[10px] rounded-[1px] bg-gray-300' />
          </div>

          {/* Right: label, title, steps */}
          <div className='flex flex-col justify-center'>
            <p className='mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-500'>
              How it works
            </p>
            <h2 className='mb-12 font-serif text-[42px] font-light leading-[48px] tracking-[-0.01em] text-black'>
              {mainProcess.title}
            </h2>
            <div className='flex flex-col gap-8'>
              {mainProcess.steps.map((step, i) => (
                <div key={step.name} className='flex items-start gap-6'>
                  <div className='w-6 shrink-0 pt-0.5'>
                    <span className='font-mono text-[11px] tracking-[0.08em] text-blue-500'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='font-sans text-base underline decoration-1 [text-underline-position:from-font] text-black'>
                      {step.name}
                    </p>
                    <p className='font-sans text-[15px] leading-6 text-gray-500'>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
