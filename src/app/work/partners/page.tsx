import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { PartnersTable } from '@/components/partners/PartnersTable'
import { AccordionList } from '@/components/ui/AccordionList'
import { ActionBand } from '@/components/ui/ActionBand'
import { ListingHeader } from '@/components/ui/ListingHeader'

export default async function PartnersPage() {
  const [partners, faqs] = await Promise.all([
    notionApi.getPartners(),
    contentfulApi.getFAQs('Partner Questions'),
  ])

  return (
    <>
      <ListingHeader
        label='Nonprofit Partners'
        title='The organizations we serve'
        countLabel={`${partners.length} organizations`}
        description='From local food banks to global advocacy groups, every partner receives high-quality software at no cost.'
        color='purple'
      />

      {/* Partners grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <PartnersTable partners={partners} />
        </div>
      </section>

      <AccordionList items={faqs} color='purple' />

      <ActionBand />
    </>
  )
}
