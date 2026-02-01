import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { StepsList } from '@/components/ui/StepsList'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import { contentfulApi } from '@/lib/contentful'
import { Heart, UserStar, Community } from 'iconoir-react'

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const reasonsIcons = {
  UserStar: <UserStar {...iconProps} />,
  Heart: <Heart {...iconProps} />,
  Community: <Community {...iconProps} />,
}

export default async function StudentsPage() {
  const [reasons, faqs, chapterProcess, studentBanner] = await Promise.all([
    contentfulApi.getInfoCards('Student Reasons'),
    contentfulApi.getFAQs('Student Questions'),
    contentfulApi.getProcess('Starting Chapter Process'),
    contentfulApi.getAssetUrl('student-banner'),
  ])

  return (
    <>
      <SplitHero
        heading='Start a Hack for Impact Chapter'
        description='Bring Hack for Impact to your campus. Found a chapter, build a team of student technologists, and create real software for nonprofits in your community.'
        buttonText='Get started'
        buttonHref='#start'
        gradient='from-green-100 to-blue-200'
        image={studentBanner || undefined}
        alt='A close up of a student speaking into a microphone looking outwards while giving a lecture'
      />

      {reasons && (
        <CardGrid
          heading='Why start a chapter'
          items={reasons.cards}
          icons={reasonsIcons}
        />
      )}

      {chapterProcess && (
        <section
          id='start'
          className='scroll-mt-8 px-8 py-16 md:px-12 md:py-24'
        >
          <h2 className='mb-8 text-center font-sans text-2xl md:mb-12 md:text-3xl'>
            {chapterProcess.title ?? 'How to start a chapter'}
          </h2>
          <div className='mx-auto max-w-3xl'>
            <StepsList
              steps={chapterProcess.steps}
              numbered={chapterProcess.numbered}
            />
          </div>
        </section>
      )}

      {/* Existing Chapters */}
      <section className='bg-gray-50 px-8 py-16 text-center md:px-12 md:py-24'>
        <h2 className='mb-4 font-sans text-2xl md:text-3xl'>
          Looking to join an existing chapter?
        </h2>
        <p className='mb-6 font-serif text-gray-600'>
          We have chapters at universities across the country. Find one near
          you.
        </p>
        <Link href='/chapters'>
          <Button>Browse chapters</Button>
        </Link>
      </section>

      <FAQList items={faqs} />

      <CallToAction
        heading='Ready to start a chapter?'
        buttonText='Apply'
        href='mailto:contact@hack4impact.org?subject=Starting a Chapter at [University Name]'
        color='bg-green-100'
      />
    </>
  )
}
