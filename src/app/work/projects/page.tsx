import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ProjectsTable } from '@/components/ui/projects/ProjectsTable'
import { AccordionList } from '@/components/ui/AccordionList'
import { ActionBand } from '@/components/ui/ActionBand'
import { ListingHeader } from '@/components/ui/ListingHeader'

export default async function ProjectsPage() {
  const [projects, faqs] = await Promise.all([
    notionApi.getProjects(),
    contentfulApi.getFAQs('Project Questions'),
  ])

  return (
    <>
      <ListingHeader
        label='Our Work'
        title='The work we build'
        countLabel={`${projects.length} projects`}
        description='Every project is handed off with full source code and no strings or maintenance fees.'
        color='green'
      />

      {/* Projects grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ProjectsTable projects={projects} />
        </div>
      </section>

      <AccordionList items={faqs} color='green' />

      <ActionBand />
    </>
  )
}
