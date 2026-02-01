import { getPartners } from '@/lib/notion/api'
import { contentfulApi } from '@/lib/contentful'
import { PartnersDataTable } from '@/components/ui/PartnersDataTable'
import { PageIntro } from '@/components/ui/PageIntro'
import { StatBar } from '@/components/ui/StatBar'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'
import Image from 'next/image'

export default async function PartnersPage() {
  const [partnersBanner, partners, faqs] = await Promise.all([
    contentfulApi.getAssetUrl('partners-banner'),
    getPartners(),
    contentfulApi.getFAQs('Partner Questions'),
  ])

  const uniqueSubjects = new Set(partners.flatMap((p) => p.subjects ?? [])).size
  const uniquePopulations = new Set(
    partners.flatMap((p) => p.populations ?? []),
  ).size

  const stats = [
    { label: 'Partners', value: partners.length },
    { label: 'Focus areas', value: uniqueSubjects },
    { label: 'Populations served', value: uniquePopulations },
  ]

  return (
    <>
      {/* Banner */}
      <section className='relative h-56 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 md:h-80'>
        {partnersBanner && (
          <Image
            fill
            src={partnersBanner}
            alt='Banner for the partners page'
            className='object-cover'
          />
        )}
      </section>

      <PageIntro
        heading='Partners'
        description="We work with nonprofit organizations across the country to build software that strengthens their missions. Here are the partners we've had the privilege of serving."
      />

      <StatBar stats={stats} />

      {/* Data Table */}
      <section className='p-8 md:p-12'>
        <PartnersDataTable partners={partners} />
      </section>

      <FAQList items={faqs} />

      <CallToAction
        heading='Want to work with us?'
        buttonText='Apply to partner'
        href='/nonprofits'
        color='bg-orange-100'
      />
    </>
  )
}
