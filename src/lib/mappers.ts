/* eslint-disable @typescript-eslint/no-explicit-any */
const NotionUtils = {
  getText: (prop: any) =>
    prop?.title?.[0]?.plain_text || prop?.rich_text?.[0]?.plain_text || "",

  getSelect: (prop: any) => prop?.select?.name || null,

  getMultiSelect: (prop: any) =>
    prop?.multi_select?.map((item: any) => item.name) || [],

  getUrl: (prop: any) => {
    const url = prop?.url?.trim();
    if (!url) return null;
    // Some fields contain multiple URLs separated by commas — take the first
    let first = url.split(",")[0].trim();
    if (!first) return null;
    // Ensure protocol is present so links don't resolve as relative paths
    if (!/^https?:\/\//i.test(first)) {
      first = `https://${first}`;
    }
    return first;
  },

  getEmail: (prop: any) => prop?.email || null,

  getPhone: (prop: any) => prop?.phone_number || null,

  getNumber: (prop: any) => prop?.number || null,

  getRelation: (prop: any) => prop?.relation?.map((item: any) => item.id) || [],

  getFile: (prop: any) => {
    const file = prop?.files?.[0];
    return file?.file?.url || file?.external?.url || null;
  },

  getPlace: (prop: any) => {
    const address: string | undefined = prop?.place?.address;
    if (!address) return null;
    // Parse "City, ST ZIP" from address like "Name, Street, City, ST ZIP, Country"
    const parts = address.split(",").map((s: string) => s.trim());
    // Find the part with a state/province code + optional zip (e.g. "MA 02215-1714" or "QC")
    for (let i = 1; i < parts.length - 1; i++) {
      const match = parts[i].match(/^([A-Z]{2})\b/);
      if (match && i > 0) {
        return `${parts[i - 1]}, ${match[1]}`;
      }
    }
    return address;
  },
};

export const mapProgram = (page: any) => {
  const p = page.properties;

  return {
    id: page.id,
    name: NotionUtils.getText(p.Name),
    status: NotionUtils.getSelect(p.Status),
    foundedYear: NotionUtils.getNumber(p.Founded),
    place: NotionUtils.getPlace(p.Place),
    coverImage: NotionUtils.getFile(p["Cover Image"]),

    // Flattening all links into one object
    links: {
      website: NotionUtils.getUrl(p.Website),
      github: NotionUtils.getUrl(p.GitHub),
      linkedin: NotionUtils.getUrl(p.LinkedIn),
      instagram: NotionUtils.getUrl(p.Instagram),
      drive: NotionUtils.getUrl(p["Google Drive"]),
    },

    contact: {
      email: NotionUtils.getEmail(p.Email),
      // 'assigned' is a Person property, often returns an array of User objects
      assignedPeopleIds: p.Assigned?.people?.map((u: any) => u.id) || [],
    },
  };
};

export const mapPartner = (page: any) => {
  const p = page.properties;

  return {
    id: page.id,
    name: NotionUtils.getText(p.Name),
    description: NotionUtils.getText(p.Description),
    status: NotionUtils.getSelect(p.Status),
    notes: NotionUtils.getText(p.Notes),

    // Categorization
    organizationTypes: NotionUtils.getMultiSelect(p["Organization Type"]),
    populations: NotionUtils.getMultiSelect(p.Population),
    subjects: NotionUtils.getMultiSelect(p.Subject),

    // Contact Info
    contact: {
      name: NotionUtils.getText(p["Contact Name"]),
      email: NotionUtils.getEmail(p.Email),
      phone: NotionUtils.getPhone(p["Phone Number"]),
    },

    links: {
      website: NotionUtils.getUrl(p.Website),
      social: NotionUtils.getUrl(p["Social Media"]),
    },

    // Relations (Just IDs)
    relatedIds: {
      chapters: NotionUtils.getRelation(p.Chapters),
      projects: NotionUtils.getRelation(p.Projects),
    },
  };
};

export const mapVolunteer = (page: any) => {
  const p = page.properties;

  return {
    id: page.id,
    name: NotionUtils.getText(p.Name),
    status: NotionUtils.getSelect(p.Status),

    demographics: {
      pronouns: NotionUtils.getMultiSelect(p.Pronouns),
      major: NotionUtils.getMultiSelect(p.Major),
      gradYear: NotionUtils.getNumber(p["Graduation Year"]),
      roles: NotionUtils.getMultiSelect(p.Roles), // e.g. ["Developer", "Chapter Lead"]
    },

    emails: {
      school: NotionUtils.getEmail(p["School Email"]),
      personal: NotionUtils.getEmail(p["Personal Email"]),
      organization: NotionUtils.getEmail(p["Organization Email"]),
    },

    links: {
      linkedin: NotionUtils.getUrl(p.LinkedIn),
      github: NotionUtils.getUrl(p.Github),
      portfolio: NotionUtils.getUrl(p["Website | Portfolio"]),
    },

    // Grouping the specific project assignments
    projectAssignments: {
      asPM: NotionUtils.getRelation(p["Projects (PMs)"]),
      asDev: NotionUtils.getRelation(p["Projects (Devs)"]),
      asDes: NotionUtils.getRelation(p["Projects (Des)"]),
      asTL: NotionUtils.getRelation(p["Projects (TLs)"]),
      asDL: NotionUtils.getRelation(p["Projects (DLs)"]),
    },

    chapterId: NotionUtils.getRelation(p.Chapters)[0] || null,
  };
};

export const mapProject = (page: any) => {
  const p = page.properties;

  return {
    id: page.id,
    name: NotionUtils.getText(p.Name),
    description: NotionUtils.getText(p.Description),
    status: NotionUtils.getSelect(p.Status),
    type: NotionUtils.getSelect(p.Type),
    activityIds: NotionUtils.getRelation(p.Activity),
    notes: NotionUtils.getText(p.Notes),

    links: {
      github: NotionUtils.getUrl(p.Github),
      figma: NotionUtils.getUrl(p.Figma),
      requirements: NotionUtils.getUrl(p["Project Requirements"]),
    },

    // Grouping the Team IDs
    team: {
      productManagers: NotionUtils.getRelation(p["Project Managers"]),
      techLeads: NotionUtils.getRelation(p["Tech Leads"]),
      designLeads: NotionUtils.getRelation(p["Design Leads"]),
      developers: NotionUtils.getRelation(p.Developers),
      designers: NotionUtils.getRelation(p.Designers),
      chapterExecs: NotionUtils.getRelation(p["Chapter Executive Directors"]),
      chapterLeadership: NotionUtils.getRelation(p["Chapter Leadership"]),
    },

    // Relations
    relatedIds: {
      chapters: NotionUtils.getRelation(p.Chapters),
      partners: NotionUtils.getRelation(p.Partners),
      operations: NotionUtils.getRelation(p["Chapter Operations"]),
    },
  };
};
