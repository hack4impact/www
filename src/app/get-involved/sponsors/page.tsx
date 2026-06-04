import { GetInvolvedHeader } from '@/components/ui/GetInvolvedHeader'
import { CTABand } from '@/components/ui/CTABand'
import { StatBar } from '@/components/ui/StatBar'
import { SponsorshipTiersTable } from '@/components/ui/SponsorshipTiersTable'
import { StepsList } from '@/components/ui/StepsList'
import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'

async function getStats() {
  const [chapters, doneProjectCount, partners, volunteerCounts] =
    await Promise.all([
      notionApi.getChapters(),
      notionApi.getDoneProjectCount(),
      notionApi.getPartners(),
      notionApi.getVolunteerCounts(),
    ])

  return [
    { value: volunteerCounts.active, label: 'Active volunteers' },
    { value: doneProjectCount, label: 'Projects completed' },
    { value: partners.length, label: 'Nonprofit partners' },
    {
      value: chapters.filter((c) => c.status === 'Active').length,
      label: 'University chapters',
    },
  ]
}

export default async function SponsorsPage() {
  const [stats, tiers, sponsorProcess] = await Promise.all([
    getStats(),
    contentfulApi.getSponsorshipTiers(),
    contentfulApi.getProcess('Sponsor Process'),
  ])

  return (
    <>
      <GetInvolvedHeader
        label='Sponsors'
        heading='Support Hack4Impact'
        description='Your sponsorship enables student-driven technology for social good. Fund the tools, events, and infrastructure that power our chapters and the nonprofits they serve.'
        buttonText='Become a sponsor'
        buttonHref='#contact'
        accentColor='text-orange-600'
        gradientOklab='97% 0.012 0.020'
      />

      <StatBar stats={stats} />

      {/* Sponsorship Tiers Table */}
      <section className='px-8 py-16 md:px-12 md:py-24'>
        <div className='mx-auto max-w-3xl'>
          <SponsorshipTiersTable tiers={tiers} />
        </div>
      </section>

      {/* Where Your Money Goes */}
      {sponsorProcess && (
        <section className='px-8 py-16 md:px-12 md:py-24'>
          <StepsList
            steps={sponsorProcess.steps}
            numbered={sponsorProcess.numbered}
            label='Where it goes'
            title={sponsorProcess.title ?? 'How we use your support'}
            accentColor='text-orange-600'
          />
        </section>
      )}

      {/* Contact CTA */}
      <CTABand />
    </>
  )
}
