import {
  getJournalEntries,
  getPaginatedJournalEntries,
  getJournalEntryBySlug,
  getBoardTeamMembers,
  getSponsorshipTiers,
  getAssetUrl,
  getFAQs,
  getProcess,
  getInfoCards,
} from './api'

export const contentfulApi = {
  getJournalEntries,
  getPaginatedJournalEntries,
  getJournalEntryBySlug,
  getBoardTeamMembers,
  getSponsorshipTiers,
  getAssetUrl,
  getFAQs,
  getProcess,
  getInfoCards,
}

export {
  mapEntry,
  mapBoardTeamMember,
  mapValue,
  mapSponsorshipTier,
  mapQuestions,
  mapProcess,
  mapInfoCards,
} from './mappers'