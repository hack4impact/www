import { Document } from '@contentful/rich-text-types';

export interface RichText {
  json: Document;
};

export interface Image {
  url: string;
  name?: string;
  description?: string;
};

export interface Collection<T> {
  items: T[];
};
