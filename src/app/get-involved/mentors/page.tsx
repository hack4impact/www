import { HeroBanner } from '@/components/ui/HeroBanner'
import { AccordionList } from '@/components/ui/AccordionList'
import { ActionBand } from '@/components/ui/ActionBand'
import { TestimonialBlock } from '@/components/ui/TestimonialBlock'
import { contentfulApi } from '@/lib/contentful'

const testimonials = [
  {
    quote:
      'I am beyond proud of the work of these students and their continued partnership with me and my colleagues.',
    name: 'Javid Fathi',
    title: 'Software Engineer Lead at Microsoft',
  },
]

export default async function MentorsPage() {
  const [faqs, mentorBanner] = await Promise.all([
    contentfulApi.getFAQs('Mentor Questions'),
    contentfulApi.getAssetUrl('mentor-banner'),
  ])

  return (
    <>
      <HeroBanner
        label='Mentors'
        heading='Mentor with Hack4Impact'
        description="Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student's career and a nonprofit's future."
        buttonText='Get involved'
        buttonHref='https://h4i.notion.site/2f0197abf07b80a794caefe319570de0/'
        color='purple'
        image={mentorBanner ?? undefined}
        alt='A mentor working with Hack4Impact students'
      />

      <TestimonialBlock testimonials={testimonials} color='purple' />

      <AccordionList label='What to expect' items={faqs} color='purple' />

      <ActionBand />
    </>
  )
}
