import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel'
import { contentfulApi } from '@/lib/contentful'
import { Puzzle, ChatBubbleQuestion, TaskList } from 'iconoir-react'

const testimonials = [
  {
    quote:
      'I am beyond proud of the work of these students and their continued partnership with me and my colleagues.',
    name: 'Javid Fathi',
    title: 'Software Engineer Lead at Microsoft',
  },
]

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const tasksIcons = {
  TaskList: <TaskList {...iconProps} />,
  ChatBubbleQuestion: <ChatBubbleQuestion {...iconProps} />,
  Puzzle: <Puzzle {...iconProps} />,
}

export default async function MentorsPage() {
  const [faqs, tasks] = await Promise.all([
    contentfulApi.getFAQs('Mentor Questions'),
    contentfulApi.getInfoCards('Mentor Tasks'),
  ])

  return (
    <>
      <SplitHero
        heading='Mentor with Hack4Impact'
        description="Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student's career and a nonprofit's future."
        buttonText='Get involved'
        buttonHref='#sign-up'
        gradient='from-purple-100 to-purple-200'
      />

      {tasks && (
        <CardGrid
          heading='What mentors do'
          items={tasks.cards}
          icons={tasksIcons}
          className='xl:mx-auto xl:max-w-[80vw]'
        />
      )}

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQList heading='What to expect' items={faqs} />

      {/* Sign Up CTA */}
      <CallToAction
        id='sign-up'
        heading='Ready to mentor?'
        buttonText='Sign up'
        href='mailto:contact@hack4impact.org?subject=Interest in Mentoring'
        color='bg-purple-100'
      />
    </>
  )
}
