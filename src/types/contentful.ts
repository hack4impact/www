import { Image, RichText } from '@/types/generic';

type ProjectType = 'National Initiative' | 'Chapter Project';

export interface ProjectContent {
  photo: Image;
  name: string;
  tags: string[];
  featuredOnHomePage?: boolean;
  type?: ProjectType;
  description: RichText;
  link: string;
};
