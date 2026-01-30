export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  description: string;
  author: string;
  publishedDate: string;
  intro: string;
  content: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: "1",
    slug: "from-federated-to-foundations",
    title: "From Federated to Foundations",
    tag: "Governance",
    readTime: "5 min read",
    description:
      "How our team approached cleaning up governance debt and re-establishing relationships with our chapters.",
    author: "Khoa Ly",
    publishedDate: "January 28, 2025",
    intro:
      "Accessibility isn't just a feature—it's a fundamental requirement for software that truly serves everyone. When we partnered with Metro Food Bank, we knew we had to get this right.",
    content:
      "## Understanding Our Users\n\nOur journey began with understanding the diverse needs of food bank donors and volunteers. Many users accessing the platform were older adults or people with varying levels of technical experience. We conducted extensive user research, including interviews with screen reader users and people with motor impairments.\n\nThe research phase lasted three weeks and involved over forty participants from various backgrounds. We learned that many potential donors abandoned the process when faced with complex forms, and volunteers struggled with scheduling interfaces that assumed high technical literacy. These insights became the foundation of our design decisions.\n\n## Choosing the Right Technology\n\nThe first major decision was choosing the right technology stack. We opted for semantic HTML as our foundation, ensuring that assistive technologies could properly interpret our interface. Every interactive element received proper ARIA labels, and we implemented keyboard navigation throughout the application.\n\nWe debated between several frontend frameworks before settling on one that prioritized accessibility out of the box. This decision added some initial learning curve for our team but paid dividends throughout development. The framework's built-in accessibility features caught numerous issues that manual testing might have missed.\n\n## The Color Contrast Challenge\n\nColor contrast became a fascinating challenge. The food bank's brand colors didn't meet WCAG AA standards, so we worked with their team to develop an accessible color palette that maintained their visual identity while ensuring readability for users with visual impairments.\n\nThis process required delicate negotiation. The organization had used their colors for over a decade, and changing them felt like losing part of their identity. We created a presentation showing how subtle adjustments could preserve the emotional impact of their brand while making it accessible to more people. In the end, they embraced the new palette enthusiastically.\n\n## Testing and Iteration\n\nTesting was crucial. We partnered with accessibility consultants and conducted usability sessions with people who rely on assistive technologies daily. Their feedback transformed our approach and revealed assumptions we didn't know we had made.\n\nOne participant who used a screen reader showed us that our \"intuitive\" icon-based navigation was completely opaque to non-sighted users. Another participant with motor impairments demonstrated how small click targets caused frustration and errors. Each session humbled us and improved our product.\n\n## Lessons Learned\n\nThis project taught us that accessibility is not a checklist to complete but a mindset to adopt. When we design for the margins, we create better experiences for everyone. The features we built for accessibility—clear navigation, readable text, logical flow—benefited all users, not just those with disabilities.",
  },
  {
    id: "2",
    slug: "the-importance-of-volunteering-in-tech",
    title: "The Importance of Volunteering in Tech",
    tag: "Opinion",
    readTime: "5 min read",
    description:
      "Exploring the need for technologists to exist in their community and to giving back in other ways.",
    author: "Khoa Ly",
    publishedDate: "January 29, 2024",
    intro:
      "Every organization remembers their first major project. For Hack4Impact, it was a patient scheduling system for Community Health Partners that taught us lessons we still carry today.",
    content:
      "## The Initial Meeting\n\nWhen we first met with Community Health Partners, we thought we understood their needs. They wanted a scheduling system—how complicated could it be? As it turned out, very complicated, and in ways we never anticipated.\n\nThe clinic's director walked us through their current process: a combination of paper calendars, sticky notes, and a shared spreadsheet that crashed regularly. Staff members had developed elaborate workarounds over the years, and any new system would need to accommodate these ingrained habits while gently guiding users toward better practices.\n\n## Confronting Our Assumptions\n\nThe clinic served a predominantly Spanish-speaking population, many of whom shared phone numbers across family members. Our initial database design assumed one phone number per patient, which immediately broke down in practice. This taught us our first lesson: assumptions are dangerous.\n\nWe had to rebuild our data model from scratch, this time with input from the clinic staff who understood their patients' realities. We learned to ask \"why\" repeatedly and to treat every assumption as a hypothesis requiring validation. This slowed our initial progress but prevented costly mistakes later.\n\n## The Communication Challenge\n\nCommunication proved to be our biggest challenge. We were students with packed schedules, and our nonprofit partner had limited availability. Weeks would pass between meaningful conversations, and requirements drifted. We learned to establish regular check-ins and create shared documentation that kept everyone aligned.\n\nWe implemented weekly fifteen-minute video calls, even when it felt like there was nothing to discuss. These brief touchpoints caught misunderstandings early and built the trust necessary for honest feedback. We also created a shared Notion workspace where both teams could track progress and flag concerns asynchronously.\n\n## The Results\n\nThe project took twice as long as we estimated, but the result exceeded expectations. The scheduling system reduced no-show rates by 34% and freed up administrative staff to focus on patient care. More importantly, we emerged as a more mature organization.\n\nSix months after launch, we returned for a follow-up visit. Seeing the system in daily use, handling hundreds of appointments smoothly, validated every late night and difficult conversation. The clinic has since referred two other organizations to us, and those partnerships have been smoother thanks to the lessons we learned here.",
  },
];

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}
