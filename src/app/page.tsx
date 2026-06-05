import Image from 'next/image'
import { CTABand } from '@/components/ui/CTABand'
import { HomeIntro } from '@/components/ui/HomeIntro'
import { TabbedCards } from '@/components/ui/TabbedCards'
import { contentfulApi } from '@/lib/contentful'

export default async function HomePage() {
  const [
    programs,
    heroImageUrl,
    processImageUrl,
    calloutImageUrl,
    mainProcess,
  ] = await Promise.all([
    contentfulApi.getInfoCards('Programs'),
    contentfulApi.getAssetUrl('home-one'),
    contentfulApi.getAssetUrl('home-two'),
    contentfulApi.getAssetUrl('home-three'),
    contentfulApi.getProcess('Main Process'),
  ])

  return (
    <>
      <HomeIntro heroImageUrl={heroImageUrl ?? undefined} />

      {/* Process Section */}
      {mainProcess && (
        <section className='border-border-subtle flex flex-col gap-12 border-t px-8 py-16 md:flex-row md:items-center md:gap-20 md:px-16 md:py-20'>
          {/* Left: image with decorative frame */}
          <div className='relative shrink-0'>
            <div
              className='border-border-subtle relative w-full overflow-hidden rounded-[5px] border bg-gradient-to-t from-green-50 to-white md:w-[480px]'
              style={{ aspectRatio: '480 / 420' }}
            >
              {processImageUrl && (
                <Image
                  fill
                  src={processImageUrl}
                  alt='Students working together on a nonprofit project'
                  className='object-cover object-[40%_50%]'
                  sizes='(max-width: 768px) calc(100vw - 4rem), 480px'
                />
              )}
            </div>
            <div className='absolute -top-[5px] -left-[5px] size-[10px] rounded-[1px] bg-gray-300' />
            <div className='absolute -top-[5px] -right-[5px] size-[10px] rounded-[1px] bg-gray-300' />
          </div>

          {/* Right: label, title, steps */}
          <div className='flex flex-col justify-center'>
            <p className='mb-5 font-mono text-[11px] tracking-[0.12em] text-blue-500 uppercase'>
              How it works
            </p>
            <h2 className='mb-12 font-serif text-[42px] leading-[48px] font-light tracking-[-0.01em] text-black'>
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
                    <p className='font-sans text-base text-black underline decoration-1 [text-underline-position:from-font]'>
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
      {programs && <TabbedCards items={programs.cards} />}

      {/* Quote Callout Section */}
      <section className='relative mt-32 flex flex-col sm:flex-row'>
        <div
          className='relative min-h-[360px] flex-shrink-0 sm:min-h-0 sm:w-1/3'
          style={{
            backgroundImage:
              'linear-gradient(in oklab 180deg, oklab(80.2% 0 0 / 0%) 0%, oklab(92.7% -0.010 -0.027) 100%)',
          }}
        >
          {calloutImageUrl && (
            <div className='absolute -top-32 right-4 bottom-0 left-4 overflow-hidden rounded-[5px]'>
              <Image
                src={calloutImageUrl}
                alt='A group photo of students from the UPenn chapter'
                fill
                className='object-cover object-top'
                sizes='(max-width: 1024px) 100vw, 33vw'
              />
            </div>
          )}
        </div>

        <div className='bg-bg-subtle flex flex-1 flex-col justify-center px-8 py-12 sm:p-20'>
          <p className='mb-7 font-mono text-[11px] tracking-[0.12em] text-gray-500 uppercase'>
            In their words
          </p>
          <blockquote className='font-serif text-[28px] leading-[40px] font-light tracking-[-0.01em] text-black italic'>
            &ldquo;...the kind of passion for socially-minded engineering our
            industry desperately needs.&rdquo;
          </blockquote>
          <div className='border-border-subtle mt-8 border-t pt-6'>
            <p className='font-sans text-[15px] leading-[18px] font-medium text-black'>
              Javid Fathi
            </p>
            <p className='mt-1 font-mono text-[11px] leading-[14px] tracking-[0.06em] text-gray-500'>
              Software Engineer Lead, Microsoft
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}

      <CTABand />
    </>
  )
}
