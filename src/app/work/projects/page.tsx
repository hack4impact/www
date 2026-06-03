import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ProjectsTable } from '@/components/ui/ProjectsTable'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { WorkHeader } from '@/components/ui/WorkHeader'

export default async function ProjectsPage() {
  const [projects, faqs] = await Promise.all([
    notionApi.getProjects(),
    contentfulApi.getFAQs('Project Questions'),
  ])

  return (
    <>
      <WorkHeader
        label='Our Work'
        title='The work we build'
        countLabel={`${projects.length} projects delivered`}
        description='Every project is handed off with full source code and no strings or maintenance fees.'
        labelColor='text-green-600'
        gradientOklab='93.5% -0.050 0.016'
      />

      {/* Projects grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ProjectsTable projects={projects} />
        </div>
      </section>

      <FAQList items={faqs} accentColor='text-green-600' />

      <CTABand />
    </>
  )
}
