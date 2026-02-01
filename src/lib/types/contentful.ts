import type { Document } from '@contentful/rich-text-types'

export interface JournalEntry {
  id: string
  slug: string
  title: string
  tag: string
  readTime: string
  description: string
  author: string
  publishedDate: string
  intro: string
  content: Document
}

export interface BoardTeamMember {
  name: string
  team: string
  title: string
  email?: string
  website?: string
}

export interface Value {
  name: string
  description: string
  icon: string
}

export interface SponsorshipTier {
  name: string
  cost: number
  benefits: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface ProcessStep {
  name: string
  description: string
}

export interface ContentfulProcess {
  title?: string
  numbered: boolean
  steps: ProcessStep[]
}

export interface InfoCard {
  name: string
  description: string
  icon?: string
  link?: string
}

export interface ContentfulInfoCards {
  name: string
  cards: InfoCard[]
}
