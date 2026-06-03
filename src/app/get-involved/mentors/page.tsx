import { GetInvolvedHeader } from '@/components/ui/GetInvolvedHeader'
import { CardGrid } from '@/components/ui/CardGrid'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel'
import { contentfulApi } from '@/lib/contentful'
import { Puzzle, ChatBubbleQuestion, TaskList } from 'iconoir-react'
import { iconProps } from '@/lib/constants'

const testimonials = [
  {
    quote:
      'I am beyond proud of the work of these students and their continued partnership with me and my colleagues.',
    name: 'Javid Fathi',
    title: 'Software Engineer Lead at Microsoft',
  },
]

const tasksIcons = {
  TaskList: <TaskList {...iconProps} />,
  ChatBubbleQuestion: <ChatBubbleQuestion {...iconProps} />,
  Puzzle: <Puzzle {...iconProps} />,
}

export default async function MentorsPage() {
  const [faqs, tasks, mentorBanner] = await Promise.all([
    contentfulApi.getFAQs('Mentor Questions'),
    contentfulApi.getInfoCards('Mentor Tasks'),
    contentfulApi.getAssetUrl('mentor-banner'),
  ])

  return (
    <>
      <GetInvolvedHeader
        label='Mentors'
        heading='Mentor with Hack4Impact'
        description="Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student's career and a nonprofit's future."
        buttonText='Get involved'
        buttonHref='#sign-up'
        accentColor='text-purple-600'
        gradientOklab='96.5% 0.010 -0.025'
        image={mentorBanner ?? undefined}
        alt='A mentor working with Hack4Impact students'
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

      <FAQList heading='What to expect' items={faqs} accentColor='text-purple-600' />

      {/* Sign Up CTA */}
      <CTABand />
    </>
  )
}
