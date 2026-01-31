import type { JournalEntry, BoardTeamMember, Value, SponsorshipTier } from "@/lib/types/contentful";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapEntry(item: any): JournalEntry {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapBoardTeamMember(item: any): BoardTeamMember {
  const f = item.fields;
  return {
    name: f.name,
    team: f.team,
    title: f.title,
    email: f.email || undefined,
    website: f.website || undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapValue(item: any): Value {
  const f = item.fields;
  return {
    name: f.name,
    description: f.description,
    icon: f.icon,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSponsorshipTier(item: any): SponsorshipTier {
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
