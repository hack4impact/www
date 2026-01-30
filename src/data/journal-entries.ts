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
  image?: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: "1",
    slug: "building-accessible-software-for-nonprofits",
    title: "From Federated to Foundations",
    tag: "Governance",
    readTime: "5 min read",
    description:
      "How our team approached cleaning up governance debt and re-establishing relationships with our chapters.",
    author: "Khoa Ly",
    publishedDate: "January 29, 2025",
    intro:
      "Accessibility isn't just a feature—it's a fundamental requirement for software that truly serves everyone. When we partnered with Metro Food Bank, we knew we had to get this right.",
    content:
      "## Understanding Our Users\n\nOur journey began with understanding the diverse needs of food bank donors and volunteers. Many users accessing the platform were older adults or people with varying levels of technical experience. We conducted extensive user research, including interviews with screen reader users and people with motor impairments.\n\nThe research phase lasted three weeks and involved over forty participants from various backgrounds. We learned that many potential donors abandoned the process when faced with complex forms, and volunteers struggled with scheduling interfaces that assumed high technical literacy. These insights became the foundation of our design decisions.\n\n## Choosing the Right Technology\n\nThe first major decision was choosing the right technology stack. We opted for semantic HTML as our foundation, ensuring that assistive technologies could properly interpret our interface. Every interactive element received proper ARIA labels, and we implemented keyboard navigation throughout the application.\n\nWe debated between several frontend frameworks before settling on one that prioritized accessibility out of the box. This decision added some initial learning curve for our team but paid dividends throughout development. The framework's built-in accessibility features caught numerous issues that manual testing might have missed.\n\n## The Color Contrast Challenge\n\nColor contrast became a fascinating challenge. The food bank's brand colors didn't meet WCAG AA standards, so we worked with their team to develop an accessible color palette that maintained their visual identity while ensuring readability for users with visual impairments.\n\nThis process required delicate negotiation. The organization had used their colors for over a decade, and changing them felt like losing part of their identity. We created a presentation showing how subtle adjustments could preserve the emotional impact of their brand while making it accessible to more people. In the end, they embraced the new palette enthusiastically.\n\n## Testing and Iteration\n\nTesting was crucial. We partnered with accessibility consultants and conducted usability sessions with people who rely on assistive technologies daily. Their feedback transformed our approach and revealed assumptions we didn't know we had made.\n\nOne participant who used a screen reader showed us that our \"intuitive\" icon-based navigation was completely opaque to non-sighted users. Another participant with motor impairments demonstrated how small click targets caused frustration and errors. Each session humbled us and improved our product.\n\n## Lessons Learned\n\nThis project taught us that accessibility is not a checklist to complete but a mindset to adopt. When we design for the margins, we create better experiences for everyone. The features we built for accessibility—clear navigation, readable text, logical flow—benefited all users, not just those with disabilities.",
  },
  {
    id: "2",
    slug: "lessons-from-our-first-client-partnership",
    title: "Lessons from Our First Client Partnership",
    tag: "Case Study",
    readTime: "8 min read",
    description:
      "Reflecting on the successes and challenges of our inaugural project with a community health organization.",
    author: "Marcus Johnson",
    publishedDate: "December 8, 2024",
    intro:
      "Every organization remembers their first major project. For Hack4Impact, it was a patient scheduling system for Community Health Partners that taught us lessons we still carry today.",
    content:
      "## The Initial Meeting\n\nWhen we first met with Community Health Partners, we thought we understood their needs. They wanted a scheduling system—how complicated could it be? As it turned out, very complicated, and in ways we never anticipated.\n\nThe clinic's director walked us through their current process: a combination of paper calendars, sticky notes, and a shared spreadsheet that crashed regularly. Staff members had developed elaborate workarounds over the years, and any new system would need to accommodate these ingrained habits while gently guiding users toward better practices.\n\n## Confronting Our Assumptions\n\nThe clinic served a predominantly Spanish-speaking population, many of whom shared phone numbers across family members. Our initial database design assumed one phone number per patient, which immediately broke down in practice. This taught us our first lesson: assumptions are dangerous.\n\nWe had to rebuild our data model from scratch, this time with input from the clinic staff who understood their patients' realities. We learned to ask \"why\" repeatedly and to treat every assumption as a hypothesis requiring validation. This slowed our initial progress but prevented costly mistakes later.\n\n## The Communication Challenge\n\nCommunication proved to be our biggest challenge. We were students with packed schedules, and our nonprofit partner had limited availability. Weeks would pass between meaningful conversations, and requirements drifted. We learned to establish regular check-ins and create shared documentation that kept everyone aligned.\n\nWe implemented weekly fifteen-minute video calls, even when it felt like there was nothing to discuss. These brief touchpoints caught misunderstandings early and built the trust necessary for honest feedback. We also created a shared Notion workspace where both teams could track progress and flag concerns asynchronously.\n\n## The Results\n\nThe project took twice as long as we estimated, but the result exceeded expectations. The scheduling system reduced no-show rates by 34% and freed up administrative staff to focus on patient care. More importantly, we emerged as a more mature organization.\n\nSix months after launch, we returned for a follow-up visit. Seeing the system in daily use, handling hundreds of appointments smoothly, validated every late night and difficult conversation. The clinic has since referred two other organizations to us, and those partnerships have been smoother thanks to the lessons we learned here.",
  },
  {
    id: "3",
    slug: "why-students-should-consider-tech-for-good",
    title: "Why Students Should Consider Tech for Good",
    tag: "Opinion",
    readTime: "4 min read",
    description:
      "A perspective on how volunteering technical skills can shape both communities and careers.",
    author: "Priya Patel",
    publishedDate: "November 22, 2024",
    intro:
      "In a field obsessed with disruption and scale, there's something radical about building software that simply helps people. Here's why more students should consider this path.",
    content:
      "## The Puzzled Looks\n\nWhen I tell fellow computer science students that I spend my weekends building software for nonprofits, I often get puzzled looks. Why would you work for free when you could be grinding LeetCode or building a startup?\n\nThe question reveals something about how we've been taught to think about our skills—as commodities to be optimized for maximum return. But this framing misses something essential about why many of us were drawn to technology in the first place: the desire to build things that matter.\n\n## Becoming a Better Engineer\n\nThe answer is simple: this work has made me a better engineer and a more thoughtful person. Working with nonprofits exposes you to problems that matter—problems where the measure of success isn't user engagement or revenue, but tangible improvements in people's lives.\n\nThe constraints are different too. Nonprofits operate with limited budgets and often lack technical staff for ongoing maintenance. This forces you to write cleaner, more maintainable code and to document thoroughly. You learn to build systems that can outlast your involvement—a skill that translates directly to professional software development.\n\n## The Practical Argument\n\nThere's also a practical argument. Nonprofit projects offer something rare in student life: the opportunity to ship real software to real users. You'll learn to navigate ambiguous requirements, communicate with non-technical stakeholders, and make decisions with incomplete information. These skills are invaluable and difficult to develop in classroom settings.\n\nIn my interviews for internships, the projects I discussed most compellingly were always my nonprofit work. Recruiters were genuinely interested in hearing about the challenges we faced and how we overcame them. Real-world complexity is more impressive than any toy project.\n\n## The Bigger Picture\n\nThe tech industry has immense power to shape society. By engaging with social impact work early in our careers, we develop the habits and perspectives that will guide how we wield that power throughout our professional lives.\n\nI've watched classmates take high-paying jobs at companies whose products they find ethically questionable, telling themselves they'll do meaningful work later. But habits calcify, and golden handcuffs tighten. Starting with purpose makes it easier to maintain purpose.\n\n## An Invitation\n\nIf you're reading this and feeling curious, I encourage you to reach out to a local Hack4Impact chapter or similar organization. The work is hard, the hours can be long, and the problems are messier than anything in your textbooks. But you'll emerge with skills, stories, and a sense of purpose that no amount of algorithmic practice can provide.",
  },
  {
    id: "4",
    slug: "designing-with-empathy-a-ux-framework",
    title: "Designing with Empathy: A UX Framework",
    tag: "Design",
    readTime: "6 min read",
    description:
      "Our approach to user research and design thinking when working with underserved communities.",
    author: "Jordan Williams",
    publishedDate: "October 30, 2024",
    intro:
      "Designing for underserved communities requires more than good intentions. It demands a rigorous commitment to understanding contexts and constraints that may be entirely foreign to us as designers.",
    content:
      "## A Formative Mistake\n\nEarly in my time with Hack4Impact, I made a mistake that still shapes my approach to design. We were building an app for a homeless services organization, and I designed a beautiful onboarding flow that required an email address. It never occurred to me that many of our users wouldn't have email accounts.\n\nThe case worker who reviewed our prototype was kind but direct: \"This won't work for most of our clients.\" In that moment, I realized how much my assumptions about technology access were shaped by my own privileged experience. This humbling realization became the foundation of everything that followed.\n\n## The Empathy Framework\n\nThis experience led us to develop what we call the Empathy Framework—a structured approach to understanding users whose lives differ significantly from our own. The framework has three pillars: immersion, collaboration, and iteration.\n\nWe've refined this framework over dozens of projects, and it has become central to how we train new designers. Each pillar addresses a specific failure mode we've observed in social impact technology projects.\n\n## Pillar One: Immersion\n\nImmersion means spending time in the environments where our software will be used. We shadow case workers, attend community meetings, and observe existing processes before writing a single line of code. This investment pays dividends in designs that actually fit into people's lives.\n\nDuring one project, our immersion phase revealed that the organization's intake process happened in a noisy, chaotic waiting room. This insight led us to design an interface with larger text, higher contrast, and audio feedback—features that might have seemed unnecessary from the comfort of our quiet design studio.\n\n## Pillar Two: Collaboration\n\nCollaboration means treating our nonprofit partners as co-designers, not just clients. They understand their communities in ways we never will. Our job is to translate their expertise into effective digital experiences.\n\nWe've learned to bring rough sketches and wireframes to early meetings rather than polished mockups. High-fidelity designs can intimidate non-technical partners into silence, while rough sketches invite critique and co-creation. Some of our best features have emerged from sticky note sessions with frontline staff.\n\n## Pillar Three: Iteration\n\nIteration means accepting that we'll get things wrong and building processes to learn quickly. We release early, gather feedback constantly, and remain humble about our assumptions.\n\nWe build feedback mechanisms into every product we create—not just bug reports, but channels for users to tell us when something doesn't fit their reality. This ongoing dialogue ensures our products improve even after our formal engagement ends.\n\n## Applying the Framework\n\nThe Empathy Framework isn't a checklist but a mindset. It reminds us that good design requires us to step outside our own experiences and genuinely engage with the people we're trying to serve. When we fail—and we still do—it's usually because we rushed through one of these pillars under time pressure.\n\nWe share this framework freely with other organizations because we believe the tech industry desperately needs more empathetic design. If even a few teams adopt these practices, we'll have multiplied our impact far beyond the projects we directly touch.",
  },
];

export function getJournalEntryBySlug(slug: string): JournalEntry | undefined {
  return journalEntries.find((entry) => entry.slug === slug);
}
