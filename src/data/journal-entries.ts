export interface JournalEntry {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  description: string;
  image?: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Building Accessible Software for Nonprofits",
    tag: "Engineering",
    readTime: "5 min read",
    description: "How our team approached accessibility challenges while developing a donation platform for a local food bank.",
  },
  {
    id: "2",
    title: "Lessons from Our First Client Partnership",
    tag: "Case Study",
    readTime: "8 min read",
    description: "Reflecting on the successes and challenges of our inaugural project with a community health organization.",
  },
  {
    id: "3",
    title: "Why Students Should Consider Tech for Good",
    tag: "Opinion",
    readTime: "4 min read",
    description: "A perspective on how volunteering technical skills can shape both communities and careers.",
  },
  {
    id: "4",
    title: "Designing with Empathy: A UX Framework",
    tag: "Design",
    readTime: "6 min read",
    description: "Our approach to user research and design thinking when working with underserved communities.",
  },
];
