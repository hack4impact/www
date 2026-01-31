import { createClient } from "contentful";
import { unstable_cache } from "next/cache";
import type { JournalEntry, BoardTeamMember, Value, SponsorshipTier } from "@/lib/types/contentful";

export type { JournalEntry, BoardTeamMember, Value, SponsorshipTier };

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error("CONTENTFUL_SPACE_ID environment variable is not set");
}
if (!process.env.CONTENTFUL_PREVIEW_TOKEN) {
  throw new Error("CONTENTFUL_PREVIEW_TOKEN environment variable is not set");
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntry(item: any): JournalEntry {
  const f = item.fields;
  return {
    id: item.sys.id,
    slug: f.slug,
    title: f.title,
    tag: f.tag,
    readTime: `${f.readTime} min read`,
    description: f.description,
    author: f.author,
    publishedDate: formatDate(f.published),
    intro: f.intro,
    content: f.content,
  };
}

async function fetchJournalEntries(): Promise<JournalEntry[]> {
  try {
    const response = await client.getEntries({
      content_type: "journalEntry",
      order: ["-fields.published"],
    });
    return response.items.map(mapEntry);
  } catch (error) {
    console.error("Failed to fetch journal entries from Contentful:", error);
    return [];
  }
}

// --- Board & Team ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBoardTeamMember(item: any): BoardTeamMember {
  const f = item.fields;
  return {
    name: f.name,
    team: f.team,
    title: f.title,
    email: f.email || undefined,
    website: f.website || undefined,
  };
}

async function fetchBoardTeamMembers(): Promise<BoardTeamMember[]> {
  try {
    const response = await client.getEntries({
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

// --- Values ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapValue(item: any): Value {
  const f = item.fields;
  return {
    name: f.name,
    description: f.description,
    icon: f.icon,
  };
}

async function fetchValues(): Promise<Value[]> {
  try {
    const response = await client.getEntries({
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

// --- Sponsorship ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSponsorshipTier(item: any): SponsorshipTier {
  const f = item.fields;
  const benefits = (f.benefits ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b: any) => b.fields?.name)
    .filter(Boolean) as string[];
  return {
    name: f.name,
    cost: f.cost,
    benefits,
  };
}

async function fetchSponsorshipTiers(): Promise<SponsorshipTier[]> {
  try {
    const response = await client.getEntries({
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

// --- Media Assets ---

async function fetchAssetUrl(title: string): Promise<string | null> {
  try {
    const response = await client.getAssets({
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

// --- Journal ---

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
