import { notionApi } from '@/lib/notion'
import { contentfulApi } from '@/lib/contentful'
import { ChaptersTable } from '@/components/ui/ChaptersTable'
import { FAQList } from '@/components/ui/FAQList'
import { CTABand } from '@/components/ui/CTABand'
import { WorkHeader } from '@/components/ui/WorkHeader'

export default async function ChaptersPage() {
  const [chapters, roles, faqs] = await Promise.all([
    notionApi.getChapters(),
    contentfulApi.getInfoCards('Chapter Roles'),
    contentfulApi.getFAQs('Chapter Questions'),
  ])

  // Fetch all chapter images in parallel (each is individually cached)
  const imageUrls = await Promise.all(
    chapters.map((c) => contentfulApi.getAssetUrl(c.slug)),
  )
  const images: Record<string, string | null> = {}
  chapters.forEach((c, i) => {
    images[c.slug] = imageUrls[i]
  })

  return (
    <>
      <WorkHeader
        label='Our Chapters'
        title='A nationwide student network'
        countLabel={`${chapters.length} chapters`}
        description='Student-run, university-based chapters sharing resources, mentors, and a common mission.'
        labelColor='text-blue-500'
      />

      {/* Chapters grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ChaptersTable chapters={chapters} images={images} />
        </div>
      </section>

      <FAQList items={faqs} />

      <CTABand />
    </>
  )
}
