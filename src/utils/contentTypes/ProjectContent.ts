import { Image, RichText } from './generic';

export type ProjectType = 'National Initiative' | 'Chapter Project';

export default type ProjectContent = {
  photo: Image;
  name: string;
  tags: string[];
  featuredOnHomePage?: boolean;
  type?: ProjectType;
  description: RichText;
  link: string;
};
