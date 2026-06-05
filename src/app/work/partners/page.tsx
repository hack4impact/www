import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { PartnersTable } from '@/components/ui/PartnersTable'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { WorkHeader } from '@/components/ui/WorkHeader'

export default async function PartnersPage() {
  const [partners, faqs] = await Promise.all([
    notionApi.getPartners(),
    contentfulApi.getFAQs('Partner Questions'),
  ])

  return (
    <>
      <WorkHeader
        label='Nonprofit Partners'
        title='The organizations we serve'
        countLabel={`${partners.length} organizations`}
        description='From local food banks to global advocacy groups, every partner receives high-quality software at no cost.'
        labelColor='text-purple-600'
      />

      {/* Partners grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <PartnersTable partners={partners} />
        </div>
      </section>

      <FAQList items={faqs} accentColor='text-purple-600' />

      <CTABand />
    </>
  )
}
