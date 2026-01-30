import { createClient, type ContentfulClientApi } from "contentful";
import type {
  ChapterFields,
  ProjectFields,
  PartnerFields,
  JournalPostFields,
  PageFields,
  ContentfulEntry,
} from "../types/contentful";

// Contentful client configuration
const client: ContentfulClientApi<undefined> = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

// Preview client for draft content
const previewClient: ContentfulClientApi<undefined> = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || "",
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
  host: "preview.contentful.com",
});

export function getClient(preview = false): ContentfulClientApi<undefined> {
  return preview ? previewClient : client;
}

// Generic fetch function for entries
export async function getEntries<T>(
  contentType: string,
  options: Record<string, unknown> = {},
  preview = false,
): Promise<ContentfulEntry<T>[]> {
  const contentfulClient = getClient(preview);
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
    ...options,
  });
  return entries.items as unknown as ContentfulEntry<T>[];
}

// Fetch a single entry by slug
export async function getEntryBySlug<T>(
  contentType: string,
  slug: string,
  preview = false,
): Promise<ContentfulEntry<T> | null> {
  const entries = await getEntries<T>(
    contentType,
    { "fields.slug": slug, limit: 1 },
    preview,
  );
  return entries[0] || null;
}

// Chapters
export async function getChapters(preview = false) {
  return getEntries<ChapterFields>(
    "chapter",
    { order: ["fields.name"] },
    preview,
  );
}

export async function getChapterBySlug(slug: string, preview = false) {
  return getEntryBySlug<ChapterFields>("chapter", slug, preview);
}

// Projects
export async function getProjects(preview = false) {
  return getEntries<ProjectFields>(
    "project",
    { order: ["-fields.date"] },
    preview,
  );
}

export async function getProjectBySlug(slug: string, preview = false) {
  return getEntryBySlug<ProjectFields>("project", slug, preview);
}

// Partners (formerly nonprofits)
export async function getPartners(preview = false) {
  return getEntries<PartnerFields>(
    "partner",
    { order: ["fields.name"] },
    preview,
  );
}

export async function getPartnerBySlug(slug: string, preview = false) {
  return getEntryBySlug<PartnerFields>("partner", slug, preview);
}

// Journal Posts
export async function getJournalPosts(preview = false) {
  return getEntries<JournalPostFields>(
    "journalPost",
    { order: ["-fields.publishDate"] },
    preview,
  );
}

export async function getJournalPostBySlug(slug: string, preview = false) {
  return getEntryBySlug<JournalPostFields>("journalPost", slug, preview);
}

// Pages
export async function getPage(slug: string, preview = false) {
  return getEntryBySlug<PageFields>("page", slug, preview);
}

export default client;
