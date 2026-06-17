import { HeroBanner } from '@/components/ui/HeroBanner'
import { SplitPanel } from '@/components/ui/SplitPanel'
import { StepsList } from '@/components/ui/StepsList'
import { CollapsibleList } from '@/components/ui/CollapsibleList'
import { ActionBand } from '@/components/ui/ActionBand'
import { contentfulApi } from '@/lib/contentful'

export default async function StudentsPage() {
  const [faqs, chapterProcess, studentBanner] = await Promise.all([
    contentfulApi.getFAQs('Student Questions'),
    contentfulApi.getProcess('Starting Chapter Process'),
    contentfulApi.getAssetUrl('student-banner'),
  ])

  return (
    <>
      <HeroBanner
        label='Students'
        heading='Become a Part of Hack4Impact'
        description='Join an existing chapter or start one at your school. Build real software for nonprofits and grow as a technologist and leader.'
        color='green'
        buttonText='Start a chapter'
        buttonHref='https://tally.so/r/q4zO69'
        image={studentBanner ?? undefined}
        alt='A trio of students holding an award'
      />

      <SplitPanel
        left={{
          label: 'Already have a chapter?',
          heading: "Join your school's chapter.",
          description:
            'Many universities already have an active Hack4Impact chapter. If yours does, reach out to them directly. Each chapter runs its own applications and recruiting.',
          linkText: 'Browse all chapters',
          linkHref: '/work/chapters',
          linkArrow: '→',
          color: 'green',
        }}
        right={{
          label: 'No chapter at your school?',
          heading: 'Start one from scratch.',
          description:
            "If your school doesn't have a chapter yet, you can be the one to start it. H4I national provides everything you need including mentors, resources, and your first nonprofit partner.",
          linkText: 'How to get started',
          linkHref: '#start',
          linkArrow: '↓',
        }}
      />

      {chapterProcess && (
        <section
          id='start'
          className='scroll-mt-8 px-8 py-16 md:px-12 md:py-24'
        >
          <StepsList
            steps={chapterProcess.steps}
            numbered={chapterProcess.numbered}
            label='How to start one'
            title={chapterProcess.title ?? 'Founding a chapter'}
            color='green'
          />
        </section>
      )}

      <CollapsibleList
        items={faqs.map((f) => ({ title: f.question, content: f.answer }))}
        color='green'
      />

      <ActionBand />
    </>
  )
}
