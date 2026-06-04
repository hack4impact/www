import { GetInvolvedHeader } from '@/components/ui/GetInvolvedHeader'
import { SplitCTA } from '@/components/ui/SplitCTA'
import { StepsList } from '@/components/ui/StepsList'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { contentfulApi } from '@/lib/contentful'

export default async function StudentsPage() {
  const [faqs, chapterProcess, studentBanner] = await Promise.all([
    contentfulApi.getFAQs('Student Questions'),
    contentfulApi.getProcess('Starting Chapter Process'),
    contentfulApi.getAssetUrl('student-banner'),
  ])

  return (
    <>
      <GetInvolvedHeader
        label='Students'
        heading='Become a Part of Hack4Impact'
        description='Join an existing chapter or start one at your school. Build real software for nonprofits and grow as a technologist and leader.'
        accentColor='text-green-600'
        gradientOklab='96.5% -0.025 0.015'
        image={studentBanner ?? undefined}
        alt='A trio of students holding an award'
        contentClassName='pb-40'
      />

      <SplitCTA
        left={{
          label: 'Already have a chapter?',
          heading: "Join your school's chapter.",
          description:
            'Many universities already have an active Hack4Impact chapter. If yours does, reach out to them directly — each chapter runs its own applications and recruiting.',
          linkText: 'Browse all chapters',
          linkHref: '/work/chapters',
          linkArrow: '→',
          color: 'text-green-600',
        }}
        right={{
          label: 'No chapter at your school?',
          heading: 'Start one from scratch.',
          description:
            "If your school doesn't have a chapter yet, you can be the one to start it. H4I national provides everything you need — mentors, resources, and your first nonprofit partner.",
          linkText: 'How to get started',
          linkHref: '#start',
          linkArrow: '↓',
          color: 'text-gray-700',
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
            accentColor='text-green-600'
          />
        </section>
      )}

      <FAQList items={faqs} accentColor='text-green-600' />

      <CTABand />
    </>
  )
}
