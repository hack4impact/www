import type { Document } from '@contentful/rich-text-types';

// Base content type fields
export interface BaseFields {
  slug: string;
  title: string;
}

// Chapter content type
export interface ChapterFields extends BaseFields {
  name: string;
  location: string;
  description?: Document;
  logo?: ContentfulAsset;
  website?: string;
  foundedYear?: number;
  memberCount?: number;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

// Project content type
export interface ProjectFields extends BaseFields {
  name: string;
  description?: Document;
  shortDescription?: string;
  partner?: string;
  chapter?: string;
  featuredImage?: ContentfulAsset;
  technologies?: string[];
  date?: string;
  status?: 'in-progress' | 'completed' | 'maintenance';
  projectUrl?: string;
  githubUrl?: string;
}

// Partner content type (nonprofits, etc.)
export interface PartnerFields {
  name: string;
  slug: string;
  description?: Document;
  shortDescription?: string;
  logo?: ContentfulAsset;
  website?: string;
  mission?: string;
  location?: string;
}

// Journal/Blog post content type
export interface JournalPostFields extends BaseFields {
  content: Document;
  excerpt?: string;
  featuredImage?: ContentfulAsset;
  author?: string;
  publishDate: string;
  tags?: string[];
  category?: string;
}

// Page content type for static pages
export interface PageFields {
  title: string;
  slug: string;
  content?: Document;
  metaDescription?: string;
}

// Contentful asset type
export interface ContentfulAsset {
  fields: {
    title?: string;
    description?: string;
    file: {
      url: string;
      details?: {
        size?: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName?: string;
      contentType?: string;
    };
  };
}

// Contentful entry wrapper
export interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: T;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
