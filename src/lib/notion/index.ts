import {
  getChapterBySlug,
  getChapters,
  getDoneProjectCount,
  getPartnerBySlug,
  getPartners,
  getProjectBySlug,
  getProjects,
  getVolunteerCounts,
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

export { toSlug, NotionUtils } from './utils'

export { mapProgram, mapPartner, mapVolunteer, mapProject } from './mappers'
