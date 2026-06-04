import { GetInvolvedHeader } from '@/components/ui/GetInvolvedHeader'
import { CTABand } from '@/components/ui/CTABand'
import { StatBar } from '@/components/ui/StatBar'
import { GridTable } from '@/components/ui/GridTable'
import { StepsList } from '@/components/ui/StepsList'
import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { Check } from 'iconoir-react'

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

function formatCost(cost: number): string {
  return `$${cost.toLocaleString('en-US')}`
}

export default async function SponsorsPage() {
  const [stats, tiers, sponsorProcess] = await Promise.all([
    getStats(),
    contentfulApi.getSponsorshipTiers(),
    contentfulApi.getProcess('Sponsor Process'),
  ])

  // Collect all unique benefits in order of first appearance (lowest tier first)
  const allBenefits: string[] = []
  for (const tier of tiers) {
    for (const b of tier.benefits) {
      if (!allBenefits.includes(b)) allBenefits.push(b)
    }
  }

  // Build table rows: cost row + one row per benefit
  const costRow = {
    cells: [
      {
        text: 'Annual Contribution',
        className: 'font-mono text-sm text-gray-500',
      },
      ...tiers.map((t) => ({
        text: formatCost(t.cost),
        className: 'font-serif text-gray-600',
      })),
    ],
  }

  const benefitRows = allBenefits.map((benefit) => ({
    cells: [
      { text: benefit },
      ...tiers.map((t) => ({
        text: t.benefits.includes(benefit) ? (
          <Check width={18} height={18} strokeWidth={2} />
        ) : (
          ''
        ),
      })),
    ],
  }))

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
          {/* Desktop: comparison grid */}
          <div className='hidden md:block'>
            <GridTable
              heading='Sponsorship tiers'
              headingClassName='text-center'
              columns={['Benefits', ...tiers.map((t) => t.name)]}
              rows={[costRow, ...benefitRows]}
              centerAfterFirst
            />
          </div>

          {/* Mobile: stacked tier sections */}
          <div className='md:hidden'>
            <h2 className='mb-8 text-center font-sans text-2xl'>
              Sponsorship tiers
            </h2>
            <div className='divide-y divide-gray-200'>
              {tiers.map((tier) => (
                <div key={tier.name} className='py-6'>
                  <h3 className='font-sans text-lg'>{tier.name}</h3>
                  <p className='mt-1 font-serif text-gray-600'>
                    {formatCost(tier.cost)}
                  </p>
                  <ul className='mt-4 space-y-2'>
                    {tier.benefits.map((b) => (
                      <li
                        key={b}
                        className='flex items-start gap-2 font-serif text-gray-600'
                      >
                        <Check
                          width={16}
                          height={16}
                          strokeWidth={2}
                          className='mt-0.5 shrink-0 text-gray-500'
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
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
