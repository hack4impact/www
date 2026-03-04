import { unstable_cache } from 'next/cache'
import type {
  JournalEntry,
  BoardTeamMember,
  SponsorshipTier,
  FAQ,
  ContentfulProcess,
  ContentfulInfoCards,
} from '@/lib/types/contentful'
import { contentfulClient } from './client'
import {
  mapEntry,
  mapBoardTeamMember,
  mapSponsorshipTier,
  mapQuestions,
  mapProcess,
  mapInfoCards,
} from './mappers'

async function fetchJournalEntries(): Promise<JournalEntry[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'journalEntry',
      order: ['-fields.published'],
    })
    return response.items.map(mapEntry)
  } catch (error) {
    console.error('Failed to fetch journal entries from Contentful:', error)
    return []
  }
}

async function fetchPaginatedJournalEntries({
  limit,
  skip,
}: {
  limit: number
  skip: number
}): Promise<JournalEntry[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'journalEntry',
      order: ['-fields.published'],
      limit: limit,
      skip: skip,
    })
    return response.items.map(mapEntry)
  } catch (error) {
    console.error(
      `Failed to fetch paginated journal entries (limit: ${limit}, skip: ${skip}) from Contentful:`,
      error,
    )
    return []
  }
}

async function fetchBoardTeamMembers(): Promise<BoardTeamMember[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'boardTeam',
      limit: 100,
    })
    return response.items.map(mapBoardTeamMember)
  } catch (error) {
    console.error('Failed to fetch board/team from Contentful:', error)
    return []
  }
}

export const getBoardTeamMembers = unstable_cache(
  fetchBoardTeamMembers,
  ['contentful-board-team'],
  { revalidate: 3600 },
)

async function fetchSponsorshipTiers(): Promise<SponsorshipTier[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'sponsorship',
      include: 2,
      order: ['fields.cost'],
    })
    return response.items.map(mapSponsorshipTier)
  } catch (error) {
    console.error('Failed to fetch sponsorship tiers from Contentful:', error)
    return []
  }
}

export const getSponsorshipTiers = unstable_cache(
  fetchSponsorshipTiers,
  ['contentful-sponsorship-tiers'],
  { revalidate: 3600 },
)

async function fetchAssetUrl(title: string): Promise<string | null> {
  try {
    const response = await contentfulClient.getAssets({
      'fields.title': title,
      limit: 1,
    })
    const file = response.items[0]?.fields?.file
    if (!file?.url) return null
    return `https:${file.url}`
  } catch (error) {
    console.error(`Failed to fetch asset "${title}" from Contentful:`, error)
    return null
  }
}

export const getAssetUrl = unstable_cache(fetchAssetUrl, ['contentful-asset'], {
  revalidate: 3600,
})

export const getJournalEntries = unstable_cache(
  fetchJournalEntries,
  ['contentful-journal-entries'],
  { revalidate: 3600 },
)

export const getPaginatedJournalEntries = unstable_cache(
  fetchPaginatedJournalEntries,
  ['contentful-paginated-journal-entries'],
  { revalidate: 3600 },
)

async function fetchJournalEntryBySlug(
  slug: string,
): Promise<JournalEntry | undefined> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'journalEntry',
      'fields.slug': slug,
      limit: 1,
    })
    const item = response.items[0]
    if (!item) return undefined
    return mapEntry(item)
  } catch (error) {
    console.error(
      `Failed to fetch journal entry with slug "${slug}" from Contentful:`,
      error,
    )
    return undefined
  }
}

export const getJournalEntryBySlug = unstable_cache(
  fetchJournalEntryBySlug,
  ['contentful-journal-entry-by-slug'],
  { revalidate: 3600 },
)


// Fetches a "Common Questions" entry by name (e.g. "Partner Questions")
async function fetchFAQs(name: string): Promise<FAQ[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'questions',
      'fields.name': name,
      include: 2,
      limit: 1,
    })
    const item = response.items[0]
    if (!item) return []
    return mapQuestions(item)
  } catch (error) {
    console.error(`Failed to fetch FAQs "${name}" from Contentful:`, error)
    return []
  }
}

export const getFAQs = unstable_cache(fetchFAQs, ['contentful-faqs'], {
  revalidate: 3600,
})

// Fetches a "Process" entry by name (e.g. "Main Process")
async function fetchProcess(name: string): Promise<ContentfulProcess | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'process',
      'fields.name': name,
      include: 2,
      limit: 1,
    })
    const item = response.items[0]
    if (!item) return null
    return mapProcess(item)
  } catch (error) {
    console.error(`Failed to fetch process "${name}" from Contentful:`, error)
    return null
  }
}

export const getProcess = unstable_cache(fetchProcess, ['contentful-process'], {
  revalidate: 3600,
})

async function fetchInfoCards(
  name: string,
): Promise<ContentfulInfoCards | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'cards',
      'fields.name': name,
      include: 2,
      limit: 1,
    })

    const item = response.items[0]
    if (!item) return null
    return mapInfoCards(item)
  } catch (error) {
    console.error('Failed to fetch values from Contentful:', error)
    return null
  }
}

export const getInfoCards = unstable_cache(
  fetchInfoCards,
  ['contentful-values'],
  {
    revalidate: 3600,
  },
)

export interface ChapterLogoData {
  shortName: string
  name: string
  lightSvgUrl: string
  lightPng2xUrl: string
  lightPng1xUrl: string
  darkSvgUrl: string
  darkPng2xUrl: string
  darkPng1xUrl: string
}

const CHAPTER_NAMES: Record<string, string> = {
  bu: 'Boston University',
  calpoly: 'Cal Poly',
  carleton: 'Carleton College',
  cornell: 'Cornell University',
  drexel: 'Drexel University',
  emory: 'Emory University',
  gt: 'Georgia Tech',
  upenn: 'University of Pennsylvania',
  umd: 'University of Maryland',
  uiuc: 'University of Illinois',
  utk: 'University of Tennessee',
  mcgill: 'McGill University',
  rutgers: 'Rutgers University',
}

const CHAPTER_SHORT_NAMES = Object.keys(CHAPTER_NAMES)

async function fetchChapterLogos(): Promise<ChapterLogoData[]> {
  try {
    const allTitles = CHAPTER_SHORT_NAMES.flatMap((s) => [
      `chapter-logo-${s}`,
      `chapter-logo-dark-${s}`,
      `chapter-logo-2x-${s}`,
      `chapter-logo-dark-2x-${s}`,
    ])

    const response = await contentfulClient.getAssets({
      'fields.title[in]': allTitles,
      limit: 200,
    })

    type AssetEntry = { url: string; width?: number }
    const assetMap = new Map<string, AssetEntry>()
    for (const item of response.items) {
      const title = item.fields.title as string
      const file = item.fields.file as
        | { url?: string; details?: { image?: { width: number } } }
        | undefined
      if (file?.url) {
        assetMap.set(title, {
          url: `https:${file.url}`,
          width: file.details?.image?.width,
        })
      }
    }

    return CHAPTER_SHORT_NAMES.map((shortName) => {
      const lightSvg = assetMap.get(`chapter-logo-${shortName}`)
      const darkSvg = assetMap.get(`chapter-logo-dark-${shortName}`)
      const lightPng2x = assetMap.get(`chapter-logo-2x-${shortName}`)
      const darkPng2x = assetMap.get(`chapter-logo-dark-2x-${shortName}`)

      const lightPng2xUrl = lightPng2x?.url ?? ''
      const darkPng2xUrl = darkPng2x?.url ?? ''
      const lightHalfW = lightPng2x?.width ? Math.round(lightPng2x.width / 2) : 400
      const darkHalfW = darkPng2x?.width ? Math.round(darkPng2x.width / 2) : 400

      return {
        shortName,
        name: CHAPTER_NAMES[shortName],
        lightSvgUrl: lightSvg?.url ?? '',
        lightPng2xUrl,
        lightPng1xUrl: lightPng2xUrl ? `${lightPng2xUrl}?w=${lightHalfW}&fm=png` : '',
        darkSvgUrl: darkSvg?.url ?? '',
        darkPng2xUrl,
        darkPng1xUrl: darkPng2xUrl ? `${darkPng2xUrl}?w=${darkHalfW}&fm=png` : '',
      }
    })
  } catch (error) {
    console.error('Failed to fetch chapter logos from Contentful:', error)
    return []
  }
}

export const getChapterLogos = unstable_cache(
  fetchChapterLogos,
  ['contentful-chapter-logos'],
  { revalidate: 3600 },
)
