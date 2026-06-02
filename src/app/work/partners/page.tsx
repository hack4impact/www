import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { PartnersTable } from '@/components/ui/PartnersTable'
import { FAQList } from '@/components/ui/FAQList'
import { CallToAction } from '@/components/ui/CallToAction'

export default async function PartnersPage() {
  const [partners, faqs] = await Promise.all([
    notionApi.getPartners(),
    contentfulApi.getFAQs('Partner Questions'),
  ])

  return (
    <>
      {/* Page header */}
      <section
        className='border-b border-[#E8E8E4] px-8 pt-14 pb-12 md:px-16'
        style={{
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(94.3% 0.012 -0.026) 0%, oklab(0% 0 0 / 0%) 60%)',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex items-baseline justify-between pb-4'>
            <p
              className='font-mono text-[11px] tracking-[0.12em] uppercase'
              style={{ color: '#7C5CDB' }}
            >
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

      <CallToAction
        heading='Want to work with us?'
        buttonText='Apply to partner'
        href='/get-involved/nonprofits'
        color='bg-orange-100'
      />
    </>
  )
}
