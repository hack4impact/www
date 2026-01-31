import { unstable_cache } from "next/cache";
import type { JournalEntry, BoardTeamMember, Value, SponsorshipTier, FAQ, ContentfulProcess } from "@/lib/types/contentful";
import { contentfulClient } from "./client";
import { mapEntry, mapBoardTeamMember, mapValue, mapSponsorshipTier, mapQuestions, mapProcess } from "./mappers";

async function fetchJournalEntries(): Promise<JournalEntry[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "journalEntry",
      order: ["-fields.published"],
    });
    return response.items.map(mapEntry);
  } catch (error) {
    console.error("Failed to fetch journal entries from Contentful:", error);
    return [];
  }
}

async function fetchBoardTeamMembers(): Promise<BoardTeamMember[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "boardTeam",
      limit: 100,
    });
    return response.items.map(mapBoardTeamMember);
  } catch (error) {
    console.error("Failed to fetch board/team from Contentful:", error);
    return [];
  }
}

export const getBoardTeamMembers = unstable_cache(
  fetchBoardTeamMembers,
  ["contentful-board-team"],
  { revalidate: 3600 },
);

async function fetchValues(): Promise<Value[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "values",
    });
    return response.items.map(mapValue);
  } catch (error) {
    console.error("Failed to fetch values from Contentful:", error);
    return [];
  }
}

export const getValues = unstable_cache(fetchValues, ["contentful-values"], {
  revalidate: 3600,
});

async function fetchSponsorshipTiers(): Promise<SponsorshipTier[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "sponsorship",
      include: 2,
      order: ["fields.cost"],
    });
    return response.items.map(mapSponsorshipTier);
  } catch (error) {
    console.error("Failed to fetch sponsorship tiers from Contentful:", error);
    return [];
  }
}

export const getSponsorshipTiers = unstable_cache(
  fetchSponsorshipTiers,
  ["contentful-sponsorship-tiers"],
  { revalidate: 3600 },
);

async function fetchAssetUrl(title: string): Promise<string | null> {
  try {
    const response = await contentfulClient.getAssets({
      "fields.title": title,
      limit: 1,
    });
    const file = response.items[0]?.fields?.file;
    if (!file?.url) return null;
    return `https:${file.url}`;
  } catch (error) {
    console.error(`Failed to fetch asset "${title}" from Contentful:`, error);
    return null;
  }
}

export const getAssetUrl = unstable_cache(
  fetchAssetUrl,
  ["contentful-asset"],
  { revalidate: 3600 },
);

export const getJournalEntries = unstable_cache(
  fetchJournalEntries,
  ["contentful-journal-entries"],
  { revalidate: 3600 },
);

export async function getJournalEntryBySlug(
  slug: string,
): Promise<JournalEntry | undefined> {
  const entries = await getJournalEntries();
  return entries.find((e) => e.slug === slug);
}

// Fetches a "Common Questions" entry by name (e.g. "Partner Questions")
async function fetchFAQs(name: string): Promise<FAQ[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "questions",
      "fields.name": name,
      include: 2,
      limit: 1,
    });
    const item = response.items[0];
    if (!item) return [];
    return mapQuestions(item);
  } catch (error) {
    console.error(`Failed to fetch FAQs "${name}" from Contentful:`, error);
    return [];
  }
}

export const getFAQs = unstable_cache(fetchFAQs, ["contentful-faqs"], {
  revalidate: 3600,
});

// Fetches a "Process" entry by name (e.g. "Main Process")
async function fetchProcess(name: string): Promise<ContentfulProcess | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: "process",
      "fields.name": name,
      include: 2,
      limit: 1,
    });
    const item = response.items[0];
    if (!item) return null;
    return mapProcess(item);
  } catch (error) {
    console.error(`Failed to fetch process "${name}" from Contentful:`, error);
    return null;
  }
}

export const getProcess = unstable_cache(fetchProcess, ["contentful-process"], {
  revalidate: 3600,
});
