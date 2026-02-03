import { SplitHero } from '@/components/ui/SplitHero'
import { CallToAction } from '@/components/ui/CallToAction'
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
    { value: chapters.length, label: 'University chapters' },
  ]
}

function formatCost(cost: number): string {
  return `$${cost.toLocaleString('en-US')}`
}

export default async function SponsorsPage() {
  const [stats, tiers, sponsorProcess, sponsorBanner] = await Promise.all([
    getStats(),
    contentfulApi.getSponsorshipTiers(),
    contentfulApi.getProcess('Sponsor Process'),
    contentfulApi.getAssetUrl('sponsor-banner'),
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
      { text: 'Annual Contribution', className: 'font-sans font-semibold' },
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
      <SplitHero
        heading='Support Hack for Impact'
        description='Your sponsorship enables student-driven technology for social good. Fund the tools, events, and infrastructure that power our chapters and the nonprofits they serve.'
        buttonText='Become a sponsor'
        buttonHref='#contact'
        gradient='from-orange-100 to-purple-200'
        image={sponsorBanner || undefined}
        imageClassName='object-contain'
        alt='A hand giving a heart paper cut-out to another hand reaching out to take it.'
      />

      <StatBar heading='Our impact' stats={stats} />

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
            <h2 className='text-2xl font-sans mb-8 text-center'>
              Sponsorship tiers
            </h2>
            <div className='divide-y divide-gray-200'>
              {tiers.map((tier) => (
                <div key={tier.name} className='py-6'>
                  <h3 className='font-sans text-lg'>{tier.name}</h3>
                  <p className='font-serif text-gray-600 mt-1'>
                    {formatCost(tier.cost)}
                  </p>
                  <ul className='mt-4 space-y-2'>
                    {tier.benefits.map((b) => (
                      <li key={b} className='flex items-start gap-2 font-serif text-gray-600'>
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
          <h2 className='mb-8 text-center font-sans text-2xl md:mb-12 md:text-3xl'>
            {sponsorProcess.title ?? 'Where your support goes'}
          </h2>
          <div className='mx-auto max-w-3xl'>
            <StepsList
              steps={sponsorProcess.steps}
              numbered={sponsorProcess.numbered}
            />
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <CallToAction
        id='contact'
        heading='Interested in sponsoring?'
        buttonText='Get in touch'
        href='mailto:contact@hack4impact.org?subject=Interest in Sponsoring'
        color='bg-orange-100'
      />
    </>
  )
}
