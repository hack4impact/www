import { GetInvolvedHeader } from '@/components/ui/GetInvolvedHeader'
import { StepsList } from '@/components/ui/StepsList'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { TestimonialBlock } from '@/components/ui/TestimonialBlock'
import { contentfulApi } from '@/lib/contentful'

const testimonials = [
  {
    quote:
      "The impact of this project allows our organization to serve more communities, better meet our partner's needs, and empower individuals to revitalize their endangered languages.",
    name: 'Stephanie Witkowski',
    title: ' Executive Director / CEO of 7000 Languages',
  },
  {
    quote:
      "Their team's dedication and professionalism impressed us...I strongly recommend Hack4Impact to any nonprofit seeking meaningful, mission-driven support.",
    name: 'Vision Academy',
    title: '',
  },
]

export default async function NonprofitsPage() {
  const [faqs, nonprofitProcess, nonprofitBanner] = await Promise.all([
    contentfulApi.getFAQs('Nonprofit Questions'),
    contentfulApi.getProcess('Nonprofit Process'),
    contentfulApi.getAssetUrl('nonprofit-banner'),
  ])

  return (
    <>
      <GetInvolvedHeader
        label='Nonprofits'
        heading='Partner with Hack4Impact'
        description='We build custom software for nonprofits — free of charge. Our student teams turn your technical challenges into lasting solutions that amplify your impact.'
        buttonText='Apply now'
        buttonHref='#apply'
        accentColor='text-blue-500'
        image={nonprofitBanner ?? undefined}
        alt='Nonprofits partnering with Hack4Impact'
        imageClassName='scale-125 origin-bottom'
      />

      {nonprofitProcess && (
        <section className='px-8 py-16 md:px-12 md:py-24'>
          <StepsList
            steps={nonprofitProcess.steps}
            numbered={nonprofitProcess.numbered}
            label='For nonprofits'
            title={nonprofitProcess.title ?? 'Our process'}
            accentColor='text-blue-500'
          />
        </section>
      )}

      <TestimonialBlock
        testimonials={testimonials}
        accentColor='text-blue-500'
      />

      <FAQList
        heading='What to expect'
        items={faqs}
        accentColor='text-blue-500'
      />

      <CTABand />
    </>
  )
}
