import Image from 'next/image'
import { ActionBand } from '@/components/ui/ActionBand'
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
        <section className='border-separator flex flex-col gap-12 border-t px-8 py-16 md:flex-row md:items-center md:gap-20 md:px-16 md:py-20'>
          {/* Left: image with decorative frame */}
          <div className='relative shrink-0'>
            <div className='gradient-t-green border-separator relative aspect-[480/420] w-full overflow-hidden rounded-[5px] border md:w-[480px]'>
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
            <div className='bg-separator absolute -top-[5px] -left-[5px] size-[10px] rounded-[1px]' />
            <div className='bg-separator absolute -top-[5px] -right-[5px] size-[10px] rounded-[1px]' />
          </div>

          {/* Right: label, title, steps */}
          <div className='flex flex-col justify-center'>
            <p className='label mb-5 text-blue-500'>How it works</p>
            <h2 className='heading-display mb-12'>{mainProcess.title}</h2>
            <div className='flex flex-col gap-8'>
              {mainProcess.steps.map((step, i) => (
                <div key={step.name} className='flex items-start gap-6'>
                  <div className='w-6 shrink-0 pt-0.5'>
                    <span className='font-mono text-[11px] tracking-[0.08em] text-blue-500'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <p className='text-inverse font-sans text-base underline decoration-1 [text-underline-position:from-font]'>
                      {step.name}
                    </p>
                    <p className='text-gray-3 font-sans text-[15px] leading-6'>
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
        <div className='gradient-quote-fade relative min-h-[360px] flex-shrink-0 sm:min-h-0 sm:w-1/3'>
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

        <div className='bg-panel flex flex-1 flex-col justify-center px-8 py-12 sm:p-20'>
          <p className='label mb-7 text-gray-3'>In their words</p>
          <blockquote className='heading-card text-[28px] leading-[40px]'>
            &ldquo;...the kind of passion for socially-minded engineering our
            industry desperately needs.&rdquo;
          </blockquote>
          <div className='border-separator mt-8 border-t pt-6'>
            <p className='text-inverse font-sans text-[15px] leading-[18px] font-medium'>
              Javid Fathi
            </p>
            <p className='label-xs mt-1 text-gray-4'>
              Software Engineer Lead, Microsoft
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}

      <ActionBand />
    </>
  )
}
