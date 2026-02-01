import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { NumberedSteps } from '@/components/ui/NumberedSteps'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import { getFAQs, getInfoCards, getProcess } from '@/lib/contentful/api'
import { Heart, UserStar, Community } from 'iconoir-react'

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const reasonsIcons = {
  UserStar: <UserStar {...iconProps} />,
  Heart: <Heart {...iconProps} />,
  Community: <Community {...iconProps} />,
}

export default async function StudentsPage() {
  const [reasons, faqs, chapterProcess] = await Promise.all([
    getInfoCards('Student Reasons'),
    getFAQs('Student Questions'),
    getProcess('Starting Chapter Process'),
  ])

  return (
    <>
      <SplitHero
        heading='Start a Hack4Impact Chapter'
        description='Bring Hack4Impact to your campus. Found a chapter, build a team of student technologists, and create real software for nonprofits in your community.'
        buttonText='Get started'
        buttonHref='#start'
        gradient='from-green-100 to-blue-200'
      />

      {reasons && (
        <CardGrid
          heading='Why start a chapter'
          items={reasons.cards}
          icons={reasonsIcons}
        />
      )}

      {chapterProcess && (
        <NumberedSteps
          heading={chapterProcess.title ?? 'How to start a chapter'}
          steps={chapterProcess.steps}
          numbered={chapterProcess.numbered}
          id='start'
        />
      )}

      {/* Existing Chapters */}
      <section className='px-8 md:px-12 py-16 md:py-24 bg-gray-50 text-center'>
        <h2 className='text-2xl md:text-3xl font-sans mb-4'>
          Looking to join an existing chapter?
        </h2>
        <p className='font-serif text-gray-600 mb-6'>
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
        href='mailto:contact@hack4impact.org'
        color='bg-green-100'
      />
    </>
  )
}
