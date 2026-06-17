import { ActionBand } from '@/components/ui/ActionBand'
import { ChaptersDirectory } from '@/components/ui/chapters/ChaptersDirectory'
import { CollapsibleList } from '@/components/ui/CollapsibleList'
import { ListingHeader } from '@/components/ui/ListingHeader'
import { contentfulApi } from '@/lib/contentful'
import { notionApi } from '@/lib/notion'

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
      <ListingHeader
        label='Our Chapters'
        title='A nationwide student network'
        countLabel={`${chapters.length} chapters`}
        description='Student-run, university-based chapters sharing resources, mentors, and a common mission.'
        color='blue'
      />

      {/* Chapters grid */}
      <section className='px-8 py-10 md:px-16'>
        <div className='mx-auto max-w-[1312px]'>
          <ChaptersDirectory chapters={chapters} images={images} />
        </div>
      </section>

      <CollapsibleList
        items={faqs.map((f) => ({ title: f.question, content: f.answer }))}
      />

      <ActionBand />
    </>
  )
}
