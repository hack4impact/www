import { SplitHero } from '@/components/ui/SplitHero'
import { CardGrid } from '@/components/ui/CardGrid'
import { StepsList } from '@/components/ui/StepsList'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel'
import { contentfulApi } from '@/lib/contentful'
import { SmartphoneDevice, StatsReport, WebWindow } from 'iconoir-react'

const testimonials = [
  {
    quote:
      'The impact of this project allows our organization to serve more communities, better meet our partner’s needs, and empower individuals to revitalize their endangered languages.',
    name: 'Stephanie Witkowski',
    title: ' Executive Director / CEO of 7000 Languages',
  },
  {
    quote:
      "Their team's dedication and professionalism impressed us...I strongly recommend Hack for Impact to any nonprofit seeking meaningful, mission-driven support.",
    name: 'Vision Academy',
    title: '',
  },
]

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const

const buildsIcons = {
  WebWindow: <WebWindow {...iconProps} />,
  SmartphoneDevice: <SmartphoneDevice {...iconProps} />,
  StatsReport: <StatsReport {...iconProps} />,
}

export default async function NonprofitsPage() {
  const [faqs, nonprofitProcess, builds] = await Promise.all([
    contentfulApi.getFAQs('Nonprofit Questions'),
    contentfulApi.getProcess('Nonprofit Process'),
    contentfulApi.getInfoCards('Build Types'),
  ])

  return (
    <>
      <SplitHero
        heading='Partner with Hack for Impact'
        description='We build custom software for nonprofits — free of charge. Our student teams turn your technical challenges into lasting solutions that amplify your impact.'
        buttonText='Apply now'
        buttonHref='#apply'
        gradient='from-pink-300 to-blue-100'
      />

      {builds && (
        <CardGrid
          heading='What we build'
          items={builds.cards}
          icons={buildsIcons}
        />
      )}

      {nonprofitProcess && (
        <section className='px-8 py-16 md:px-12 md:py-24'>
          <h2 className='mb-8 text-center font-sans text-2xl md:mb-12 md:text-3xl'>
            {nonprofitProcess.title ?? 'How it works'}
          </h2>
          <div className='mx-auto max-w-3xl'>
            <StepsList
              steps={nonprofitProcess.steps}
              numbered={nonprofitProcess.numbered}
            />
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQList heading='What to expect' items={faqs} />

      {/* Apply CTA */}
      <CallToAction
        id='apply'
        heading='Ready to get started?'
        buttonText='Apply now'
        href='mailto:contact@hack4impact.org?subject=Project for [Non-Profit Name]'
      />
    </>
  )
}
