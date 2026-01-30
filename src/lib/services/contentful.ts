import { createClient } from "contentful";
import { unstable_cache } from "next/cache";
import type { Document } from "@contentful/rich-text-types";

export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  description: string;
  author: string;
  publishedDate: string;
  intro: string;
  content: Document;
}

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

async function fetchJournalEntryBySlug(
  slug: string,
): Promise<JournalEntry | undefined> {
  try {
    const response = await client.getEntries({
      content_type: "journalEntry",
      "fields.slug": slug,
      limit: 1,
    });
    if (response.items.length === 0) return undefined;
    return mapEntry(response.items[0]);
  } catch (error) {
    console.error("Failed to fetch journal entry from Contentful:", error);
    return undefined;
  }
}

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
