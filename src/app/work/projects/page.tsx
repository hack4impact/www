import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ProjectsTable } from '@/components/ui/ProjectsTable'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'

export default async function ProjectsPage() {
  const [projects, faqs] = await Promise.all([
    notionApi.getProjects(),
    contentfulApi.getFAQs('Project Questions'),
  ])

  return (
    <>
      {/* Page header */}
      <section
        className='border-b border-[#E8E8E4] px-8 pb-12 pt-14 md:px-16'
        style={{
          backgroundColor: '#ffffff',
          backgroundImage:
            'radial-gradient(circle farthest-corner at 0% 110% in oklab, oklab(93.5% -0.050 0.016) 0%, oklab(0% 0 0 / 0%) 60%)',
        }}
      >
        <div className='mx-auto max-w-[1312px]'>
          <div className='flex items-baseline justify-between pb-4'>
            <p
              className='font-mono text-[11px] uppercase tracking-[0.12em]'
              style={{ color: '#2B9212' }}
            >
              Our Work
            </p>
            <p className='font-mono text-[11px] tracking-[0.08em] text-gray-400'>
              {projects.length} projects delivered
            </p>
          </div>
          <h1 className='pb-4 font-serif text-[40px] font-light leading-[48px] tracking-[-0.02em] text-black'>
            The work we build
          </h1>
          <p className='font-sans text-base leading-6 text-gray-500'>
            Every project is handed off with full source code and no strings or
            maintenance fees.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ProjectsTable projects={projects} />
        </div>
      </section>

      <FAQList items={faqs} />

      <CTABand />
    </>
  )
}
