import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { mapPartner, mapProgram, mapProject, mapVolunteer } from "../mappers";
import type { Chapter } from "@/data/chapters";
import type { Project, TeamMember } from "@/data/projects";
import type { Partner } from "@/data/partners";

if (!process.env.NOTION_API_KEY) {
  throw new Error("NOTION_API_KEY environment variable is not set");
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const PROGRAMS_DATA_SOURCE_ID = "27b197ab-f07b-80ab-999b-000bc1682f4f";
const PROJECTS_DATA_SOURCE_ID = "27b197ab-f07b-80cf-8d0e-000b8507cb8f";
const PARTNERS_DATA_SOURCE_ID = "27b197ab-f07b-80a4-8a5d-000b57c0e149";
const VOLUNTEERS_DATA_SOURCE_ID = "27b197ab-f07b-8071-9196-000babef012e";
const TERMS_DATA_SOURCE_ID = "27c197ab-f07b-8077-8044-000b13443d6e";

// Featured project slug for the home page
export const FEATURED_PROJECT_SLUG = ""; // Set to a project slug to feature it

// Hardcoded chapter images (slug → image path and optional position)
const CHAPTER_IMAGES: Record<string, { src: string; position?: string }> = {
  "boston-university": { src: "/images/boston.jpg", position: "center 30%" },
  "cal-poly-san-luis-obispo": { src: "/images/calpoly.jpg" },
  "cornell-university": { src: "/images/cornell.jpg" },
  "georgia-tech": { src: "/images/georgia.jpg" },
  "university-of-pennsylvania": { src: "/images/upenn.jpg" },
  "university-of-maryland": { src: "/images/umd.jpg" },
  "university-of-illinois-urbana-champaign": { src: "/images/uiuc.jpg" },
};


function toSlug(name: string): string {
  return name
    .replace(/^Hack4Impact\s*/i, "")
    .replace(/^Hack\s*for\s*Impact\s*/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Paginated fetch helper ---

async function fetchAllPages(dataSourceId: string): Promise<any[]> {
  const allResults: any[] = [];
  let cursor: string | undefined;

  do {
    const query: any = { data_source_id: dataSourceId };
    if (cursor) query.start_cursor = cursor;

    const response: any = await (notion as any).dataSources.query(query);
    allResults.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return allResults;
}

// --- Raw fetch functions ---

async function fetchPrograms() {
  try {
    const results = await fetchAllPages(PROGRAMS_DATA_SOURCE_ID);
    return results.map((p: any) => mapProgram(p));
  } catch (error) {
    console.error("Failed to fetch programs from Notion:", error);
    return [];
  }
}

async function fetchProjects() {
  try {
    const results = await fetchAllPages(PROJECTS_DATA_SOURCE_ID);
    return results.map((p: any) => mapProject(p));
  } catch (error) {
    console.error("Failed to fetch projects from Notion:", error);
    return [];
  }
}

async function fetchPartners() {
  try {
    const results = await fetchAllPages(PARTNERS_DATA_SOURCE_ID);
    return results.map((p: any) => mapPartner(p));
  } catch (error) {
    console.error("Failed to fetch partners from Notion:", error);
    return [];
  }
}

async function fetchVolunteers() {
  try {
    const results = await fetchAllPages(VOLUNTEERS_DATA_SOURCE_ID);
    return results.map((v: any) => mapVolunteer(v));
  } catch (error) {
    console.error("Failed to fetch volunteers from Notion:", error);
    return [];
  }
}

async function fetchTerms() {
  try {
    const results = await fetchAllPages(TERMS_DATA_SOURCE_ID);
    return results.map((page: any) => ({
      id: page.id,
      name:
        page.properties.Name?.title?.[0]?.plain_text ||
        page.properties.Name?.rich_text?.[0]?.plain_text ||
        "",
    }));
  } catch (error) {
    console.error("Failed to fetch terms from Notion:", error);
    return [];
  }
}

// --- Cached versions (revalidate every hour) ---

const getCachedPrograms = unstable_cache(fetchPrograms, ["notion-programs"], {
  revalidate: 3600,
});
const getCachedProjects = unstable_cache(fetchProjects, ["notion-projects"], {
  revalidate: 3600,
});
const getCachedPartners = unstable_cache(fetchPartners, ["notion-partners"], {
  revalidate: 3600,
});
const getCachedVolunteers = unstable_cache(
  fetchVolunteers,
  ["notion-volunteers"],
  { revalidate: 3600 },
);
const getCachedTerms = unstable_cache(fetchTerms, ["notion-terms"], {
  revalidate: 86400,
});

// --- Public API: Chapters (Programs) ---

export async function getChapters(): Promise<Chapter[]> {
  const [programs, projects, volunteers] = await Promise.all([
    getCachedPrograms(),
    getCachedProjects(),
    getCachedVolunteers(),
  ]);

  const activePrograms = programs.filter(
    (program: any) => program.status === "Active",
  );

  return activePrograms.map((program: any) => {
    const slug = toSlug(program.name);

    const memberCount = volunteers.filter(
      (v: any) => v.chapterId === program.id && v.status === "Active",
    ).length;

    const projectCount = projects.filter((p: any) =>
      p.relatedIds.chapters.includes(program.id),
    ).length;

    const university = program.name
      .replace(/^Hack4Impact\s*/i, "")
      .replace(/^Hack\s*for\s*Impact\s*/i, "");

    const chapterImage = CHAPTER_IMAGES[slug];

    return {
      id: program.id,
      slug,
      name: program.name,
      university,
      location: program.place || "",
      founded: program.foundedYear?.toString() ?? "",
      description: "",
      memberCount,
      projectCount,
      website: program.links.website ?? undefined,
      github: program.links.github ?? undefined,
      instagram: program.links.instagram ?? undefined,
      image: chapterImage?.src,
      imagePosition: chapterImage?.position,
    } satisfies Chapter;
  });
}

export async function getChapterBySlug(
  slug: string,
): Promise<Chapter | undefined> {
  const chapters = await getChapters();
  return chapters.find((c) => c.slug === slug);
}

// --- Public API: Projects ---

export async function getProjects(): Promise<Project[]> {
  const [notionProjects, programs, notionPartners, volunteers, terms] =
    await Promise.all([
      getCachedProjects(),
      getCachedPrograms(),
      getCachedPartners(),
      getCachedVolunteers(),
      getCachedTerms(),
    ]);

  const programMap = new Map(programs.map((p: any) => [p.id, p.name]));
  const partnerMap = new Map(notionPartners.map((p: any) => [p.id, p.name]));
  const volunteerMap = new Map(volunteers.map((v: any) => [v.id, v.name]));
  const termMap = new Map(terms.map((t: any) => [t.id, t.name]));

  function resolveTeam(ids: string[], role: TeamMember["role"]): TeamMember[] {
    return ids
      .map((id) => volunteerMap.get(id))
      .filter(Boolean)
      .map((name) => ({ name, role }));
  }

  return notionProjects
    .filter((p: any) => p.type !== "Leadership")
    .map((project: any) => {
      const slug = toSlug(project.name);

      const chapterName = project.relatedIds.chapters
        .map((id: string) => programMap.get(id))
        .filter(Boolean)
        .map((name: string) =>
          name
            .replace(/^Hack4Impact\s*/i, "")
            .replace(/^Hack\s*for\s*Impact\s*/i, ""),
        )
        .join(", ");

      const partnerName = project.relatedIds.partners
        .map((id: string) => partnerMap.get(id))
        .filter(Boolean)
        .join(", ");

      const team: TeamMember[] = [
        ...resolveTeam(project.team.techLeads, "Tech Lead"),
        ...resolveTeam(project.team.productManagers, "Project Manager"),
        ...resolveTeam(project.team.designLeads, "Designer"),
        ...resolveTeam(project.team.designers, "Designer"),
        ...resolveTeam(project.team.developers, "Developer"),
      ];

      // Resolve activity relation IDs to term names
      const activityIds: string[] = project.activityIds ?? [];
      const termNames = activityIds
        .map((id: string) => termMap.get(id))
        .filter((name): name is string => !!name);

      // Derive year from term names (e.g. ["Fall 2024", "Spring 2025"] → "2025")
      const years = termNames
        .map((t) => t.match(/\d{4}/)?.[0])
        .filter((y): y is string => !!y);
      const year = years.length > 0 ? years[years.length - 1] : "";

      // Duration is the resolved term names (e.g. "Fall 2024, Spring 2025")
      const duration = termNames.join(", ");

      return {
        id: project.id,
        slug,
        title: project.name,
        partner: partnerName,
        chapter: chapterName,
        year,
        tag: project.type ?? "",
        description: project.description,
        intro: "",
        sections: [],
        team,
        duration,
        technologies: undefined,
        website: undefined,
        github: project.links.github ?? undefined,
      } satisfies Project;
    });
}

export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

// --- Public API: Partners ---

export async function getPartners(): Promise<Partner[]> {
  const [notionPartners, notionProjects] = await Promise.all([
    getCachedPartners(),
    getCachedProjects(),
  ]);

  return notionPartners.map((partner: any) => {
    const slug = toSlug(partner.name);

    const projectCount =
      partner.relatedIds.projects.length ||
      notionProjects.filter((p: any) =>
        p.relatedIds.partners.includes(partner.id),
      ).length;

    return {
      id: partner.id,
      slug,
      name: partner.name,
      location: "",
      projectCount,
      description: partner.description,
      website: partner.links.website ?? undefined,
      organizationTypes: partner.organizationTypes ?? [],
      populations: partner.populations ?? [],
      subjects: partner.subjects ?? [],
    } satisfies Partner;
  });
}

export async function getPartnerBySlug(
  slug: string,
): Promise<Partner | undefined> {
  const partners = await getPartners();
  return partners.find((p) => p.slug === slug);
}
