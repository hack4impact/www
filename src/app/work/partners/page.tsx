import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { PartnersTable } from '@/components/ui/PartnersTable'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'

export default async function PartnersPage() {
  const [partners, faqs] = await Promise.all([
    notionApi.getPartners(),
    contentfulApi.getFAQs('Partner Questions'),
  ])

  return (
    <>
      {/* Page header */}
      <section
        className='border-b border-[#E8E8E4] px-8 pb-12 pt-14 md:px-16'
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(93.1% 0.012 -0.029) 0%, oklab(0% 0 0 / 0%) 60%)',
          backgroundOrigin: 'border-box',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex items-baseline justify-between pb-4'>
            <p className='font-mono text-[11px] uppercase tracking-[0.12em] text-[#7C6BED]'>
              Nonprofit Partners
            </p>
            <p className='font-mono text-[11px] tracking-[0.08em] text-gray-400'>
              {partners.length} organizations
            </p>
          </div>
          <h1 className='pb-4 font-serif text-[40px] leading-[48px] font-light tracking-[-0.02em] text-black'>
            The organizations we serve
          </h1>
          <p className='font-sans text-base leading-6 text-gray-500'>
            From local food banks to global advocacy groups, every partner
            receives high-quality software at no cost.
          </p>
        </div>
      </section>

      {/* Partners grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <PartnersTable partners={partners} />
        </div>
      </section>

      <FAQList items={faqs} />

      <CTABand />
    </>
  )
}
