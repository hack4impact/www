import {
  FEATURED_PROJECT_SLUG,
  getChapters,
  getChapterBySlug,
  getProjects,
  getProjectBySlug,
  getPartners,
  getPartnerBySlug,
  getVolunteerCounts,
  getDoneProjectCount,
} from './api'

export const notionApi = {
  getChapters,
  getChapterBySlug,
  getProjects,
  getProjectBySlug,
  getPartners,
  getPartnerBySlug,
  getVolunteerCounts,
  getDoneProjectCount,
}

export { FEATURED_PROJECT_SLUG }

export { toSlug, NotionUtils } from './utils'

export { mapProgram, mapPartner, mapVolunteer, mapProject } from './mappers'