export interface TeamMember {
  name: string;
  role: "Tech Lead" | "Developer" | "Designer" | "Project Manager";
}

export type ProjectSection =
  | {
      type: "text";
      title: string;
      content: string;
    }
  | {
      type: "image";
      caption?: string;
    }
  | {
      type: "two-column";
      text: string;
      imagePosition: "left" | "right";
    }
  | {
      type: "image-grid";
      count: number;
    };

export interface Project {
  id: string;
  slug: string;
  title: string;
  partner: string;
  chapter: string;
  year: string;
  tag: string;
  description: string;
  intro: string;
  sections: ProjectSection[];
  team: TeamMember[];
  duration: string;
  technologies?: string[];
  website?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "food-bank-inventory",
    title: "Food Bank Inventory Management System",
    partner: "Atlanta Community Food Bank",
    chapter: "Georgia Tech",
    year: "2024",
    tag: "Web App",
    description: "A comprehensive inventory tracking system to help food banks manage donations and distributions efficiently.",
    intro: "The Atlanta Community Food Bank serves over 700,000 people annually across metro Atlanta. Their previous inventory system relied heavily on spreadsheets and manual tracking, leading to inefficiencies and occasional food waste.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Food banks operate on tight margins with perishable goods. Tracking incoming donations, managing expiration dates, and coordinating distributions across multiple locations required a more robust solution than their existing spreadsheet-based system.",
      },
      {
        type: "two-column",
        text: "We worked closely with warehouse staff to understand their daily workflows. The key insight was that any solution needed to work on mobile devices in the warehouse, not just desktop computers in the office.",
        imagePosition: "left",
      },
      {
        type: "text",
        title: "The Solution",
        content: "We built a progressive web app that works offline and syncs when connected. Staff can scan barcodes to log incoming donations, the system automatically tracks expiration dates and sends alerts, and distribution centers can request inventory through the app.",
      },
      {
        type: "image-grid",
        count: 2,
      },
      {
        type: "text",
        title: "Impact",
        content: "Since deployment, the food bank has reduced food waste by 23% and cut inventory processing time in half. The system now tracks over 2 million pounds of food monthly.",
      },
    ],
    team: [
      { name: "Sarah Chen", role: "Tech Lead" },
      { name: "Marcus Johnson", role: "Project Manager" },
      { name: "Emily Rodriguez", role: "Designer" },
      { name: "James Park", role: "Developer" },
      { name: "Aisha Patel", role: "Developer" },
      { name: "David Kim", role: "Developer" },
    ],
    duration: "8 months",
    technologies: ["React", "Node.js", "PostgreSQL", "PWA"],
    website: "https://acfb.org",
    github: "https://github.com/hack4impact-gt/food-bank-inventory",
  },
  {
    id: "2",
    slug: "volunteer-matcher",
    title: "Volunteer Matching Platform",
    partner: "Hands On Chicago",
    chapter: "Northwestern",
    year: "2024",
    tag: "Web App",
    description: "A platform connecting volunteers with opportunities based on skills, availability, and interests.",
    intro: "Hands On Chicago connects thousands of volunteers with nonprofit organizations across the city. Their challenge was matching the right volunteers to the right opportunities efficiently.",
    sections: [],
    team: [
      { name: "Michael Torres", role: "Tech Lead" },
      { name: "Jessica Liu", role: "Project Manager" },
      { name: "Ryan O'Connor", role: "Developer" },
      { name: "Priya Sharma", role: "Developer" },
      { name: "Alex Martinez", role: "Designer" },
    ],
    duration: "6 months",
    technologies: ["Next.js", "Python", "MongoDB", "AWS"],
    github: "https://github.com/hack4impact-northwestern/volunteer-matcher",
  },
  {
    id: "3",
    slug: "legal-aid-portal",
    title: "Legal Aid Client Portal",
    partner: "Philadelphia Legal Assistance",
    chapter: "Penn",
    year: "2023",
    tag: "Web App",
    description: "A secure portal for low-income clients to access legal resources and communicate with their attorneys.",
    intro: "Philadelphia Legal Assistance provides free civil legal services to low-income Philadelphians. Communication between attorneys and clients was fragmented across phone calls, emails, and in-person visits.",
    sections: [],
    team: [
      { name: "Amanda Wright", role: "Tech Lead" },
      { name: "Brandon Lee", role: "Project Manager" },
      { name: "Sofia Garcia", role: "Designer" },
      { name: "Tyler Brown", role: "Designer" },
      { name: "Nina Patel", role: "Developer" },
      { name: "Chris Anderson", role: "Developer" },
      { name: "Maya Thompson", role: "Developer" },
    ],
    duration: "10 months",
    technologies: ["React", "Express", "PostgreSQL", "Twilio"],
    website: "https://philalegal.org",
    github: "https://github.com/hack4impact-upenn/legal-aid-portal",
  },
  {
    id: "4",
    slug: "wildlife-tracker",
    title: "Wildlife Conservation Tracker",
    partner: "Bay Area Wildlife Foundation",
    chapter: "Berkeley",
    year: "2024",
    tag: "Mobile App",
    description: "A mobile app for researchers and citizen scientists to report wildlife sightings and track population trends.",
    intro: "The Bay Area Wildlife Foundation monitors endangered species across Northern California. Their data collection relied on paper forms that researchers would submit weeks after field visits.",
    sections: [],
    team: [
      { name: "Kevin Zhang", role: "Tech Lead" },
      { name: "Rachel Green", role: "Project Manager" },
      { name: "Daniel Nguyen", role: "Developer" },
      { name: "Lisa Wang", role: "Developer" },
    ],
    duration: "7 months",
    technologies: ["React Native", "Firebase", "Python", "TensorFlow"],
    github: "https://github.com/hack4impact-berkeley/wildlife-tracker",
  },
  {
    id: "5",
    slug: "tutoring-scheduler",
    title: "Tutoring Session Scheduler",
    partner: "Austin Youth Education Initiative",
    chapter: "UT Austin",
    year: "2023",
    tag: "Web App",
    description: "A scheduling system connecting student tutors with K-12 students needing academic support.",
    intro: "The Austin Youth Education Initiative provides free tutoring to underserved K-12 students. Coordinating schedules between volunteer tutors and students was a constant challenge.",
    sections: [],
    team: [
      { name: "Jordan Rivera", role: "Tech Lead" },
      { name: "Samantha Cole", role: "Project Manager" },
      { name: "Eric Wu", role: "Developer" },
      { name: "Hannah Mitchell", role: "Developer" },
      { name: "Carlos Diaz", role: "Designer" },
    ],
    duration: "5 months",
    technologies: ["Vue.js", "Django", "PostgreSQL", "SendGrid"],
    website: "https://austinyouth.org",
    github: "https://github.com/hack4impact-utexas/tutoring-scheduler",
  },
  {
    id: "6",
    slug: "donation-tracker",
    title: "Donation Management Dashboard",
    partner: "Michigan Humane Society",
    chapter: "Michigan",
    year: "2024",
    tag: "Web App",
    description: "A dashboard for tracking donations, managing donor relationships, and generating reports for grant applications.",
    intro: "The Michigan Humane Society relies on donations to fund their animal rescue and adoption programs. Their existing donor management was scattered across multiple systems.",
    sections: [],
    team: [
      { name: "Olivia Chen", role: "Tech Lead" },
      { name: "Nathan Brooks", role: "Project Manager" },
      { name: "Isabella Martinez", role: "Designer" },
      { name: "Ethan Taylor", role: "Developer" },
      { name: "Grace Kim", role: "Developer" },
      { name: "Luke Johnson", role: "Developer" },
    ],
    duration: "8 months",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    github: "https://github.com/hack4impact-umich/donation-tracker",
  },
  {
    id: "7",
    slug: "mental-health-resources",
    title: "Mental Health Resource Directory",
    partner: "Triangle Mental Health Alliance",
    chapter: "Duke",
    year: "2023",
    tag: "Web App",
    description: "A searchable directory of mental health resources with filtering by insurance, specialty, and availability.",
    intro: "Finding mental health care is challenging, especially for those with limited insurance or specific needs. The Triangle Mental Health Alliance wanted to make this search easier for North Carolina residents.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Existing directories were outdated, didn't include crucial information like insurance acceptance, and weren't designed with accessibility in mind for users who might be in crisis.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We partnered with mental health professionals to understand what information is most important when seeking care. The interface was designed to be calming and straightforward.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "Users can filter providers by insurance, specialty, language, and current availability. Each listing includes verified information that's updated quarterly. Crisis resources are prominently displayed on every page.",
      },
      {
        type: "text",
        title: "Impact",
        content: "The directory serves over 5,000 searches monthly and has helped connect hundreds of people with appropriate mental health care.",
      },
    ],
    team: [
      { name: "Zoe Williams", role: "Tech Lead" },
      { name: "Andrew Park", role: "Project Manager" },
      { name: "Mia Robinson", role: "Designer" },
      { name: "Jack Thompson", role: "Developer" },
      { name: "Emma Davis", role: "Developer" },
    ],
    duration: "6 months",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Vercel"],
    website: "https://trianglemha.org/directory",
    github: "https://github.com/hack4impact-duke/mental-health-resources",
  },
  {
    id: "8",
    slug: "refugee-services-app",
    title: "Refugee Services Navigation App",
    partner: "Welcome Center for New Americans",
    chapter: "Cornell",
    year: "2024",
    tag: "Mobile App",
    description: "A multilingual app helping refugees navigate essential services like healthcare, education, and legal assistance.",
    intro: "Refugees arriving in upstate New York face overwhelming challenges navigating a new system in an unfamiliar language. The Welcome Center needed a way to provide guidance that didn't require constant staff availability.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Refugees needed information about everything from how to enroll children in school to finding halal groceries. Staff couldn't be available 24/7, and printed guides quickly became outdated.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We worked with refugees and case workers to identify the most common questions and most critical information. The app needed to work offline and support multiple languages.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "The app provides step-by-step guides for common tasks, a directory of services with real-time availability, and push notifications for important deadlines. Content is available in 8 languages with more being added.",
      },
      {
        type: "text",
        title: "Impact",
        content: "Case workers report that clients are better prepared for appointments and more independent in navigating daily life. The app has been downloaded over 2,000 times.",
      },
    ],
    team: [
      { name: "Benjamin Lee", role: "Tech Lead" },
      { name: "Claire Wilson", role: "Project Manager" },
      { name: "Derek Chang", role: "Designer" },
      { name: "Fiona O'Brien", role: "Developer" },
      { name: "George Patel", role: "Developer" },
      { name: "Helen Tran", role: "Developer" },
    ],
    duration: "9 months",
    technologies: ["React Native", "Firebase", "i18n", "Google Translate API"],
    github: "https://github.com/hack4impact-cornell/refugee-services",
  },
  {
    id: "9",
    slug: "environmental-monitoring",
    title: "Environmental Monitoring Dashboard",
    partner: "California Coastal Commission",
    chapter: "Cal Poly",
    year: "2023",
    tag: "Data Visualization",
    description: "A dashboard visualizing environmental sensor data to track coastal ecosystem health.",
    intro: "The California Coastal Commission monitors dozens of sensors along the coast that measure water quality, temperature, and other environmental factors. The raw data was difficult to interpret.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Sensor data was stored in various formats and locations. Scientists needed hours to compile data for analysis, and the information wasn't accessible to policymakers or the public.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We built a data pipeline to normalize and aggregate sensor data, then created visualizations designed for different audiences.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "The dashboard provides real-time views of coastal health with historical comparisons. Scientists can drill down into raw data, while a public view shows simplified metrics and trends.",
      },
      {
        type: "text",
        title: "Impact",
        content: "The dashboard has been cited in policy discussions and is used by three universities for research. Data analysis that took hours now takes minutes.",
      },
    ],
    team: [
      { name: "Ian Foster", role: "Tech Lead" },
      { name: "Julia Sanchez", role: "Project Manager" },
      { name: "Kyle Nakamura", role: "Developer" },
      { name: "Lauren Chen", role: "Developer" },
    ],
    duration: "6 months",
    technologies: ["D3.js", "Python", "TimescaleDB", "AWS Lambda"],
    website: "https://coastal.ca.gov/monitoring",
    github: "https://github.com/hack4impact-calpoly/environmental-monitoring",
  },
  {
    id: "10",
    slug: "affordable-housing-finder",
    title: "Affordable Housing Search Tool",
    partner: "DC Housing Authority",
    chapter: "UMD",
    year: "2024",
    tag: "Web App",
    description: "A search tool helping DC residents find affordable housing options that match their eligibility and preferences.",
    intro: "Finding affordable housing in the DC metro area is extremely challenging. Information about available units was scattered across multiple websites and often outdated.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Eligibility requirements for affordable housing programs are complex and vary by program. Residents often applied to units they weren't eligible for, wasting time for everyone involved.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We aggregated listings from multiple sources and built an eligibility screener that helps users understand which programs they qualify for before they start searching.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "Users answer questions about their household size, income, and preferences. The tool shows only listings they're likely to qualify for, with clear explanations of requirements and application processes.",
      },
      {
        type: "text",
        title: "Impact",
        content: "The tool processes over 3,000 searches monthly. Housing authority staff report a significant decrease in ineligible applications, allowing them to process applications faster.",
      },
    ],
    team: [
      { name: "Michelle Adams", role: "Tech Lead" },
      { name: "Nicholas Brown", role: "Project Manager" },
      { name: "Olivia Wright", role: "Designer" },
      { name: "Patrick Kim", role: "Designer" },
      { name: "Quinn Johnson", role: "Developer" },
      { name: "Rebecca Liu", role: "Developer" },
      { name: "Steven Garcia", role: "Developer" },
    ],
    duration: "10 months",
    technologies: ["React", "Python", "PostgreSQL", "Mapbox"],
    website: "https://dchousing.org/search",
    github: "https://github.com/hack4impact-umd/affordable-housing",
  },
  {
    id: "11",
    slug: "nonprofit-crm",
    title: "Lightweight Nonprofit CRM",
    partner: "Illinois Nonprofit Association",
    chapter: "UIUC",
    year: "2023",
    tag: "Web App",
    description: "A simple CRM designed for small nonprofits who can't afford enterprise solutions like Salesforce.",
    intro: "Many small nonprofits struggle with donor and volunteer management because enterprise CRM solutions are too expensive and complex for their needs.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Small nonprofits often manage relationships through spreadsheets, losing valuable context and history. They need something more powerful than spreadsheets but simpler than Salesforce.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We interviewed staff at a dozen small nonprofits to understand their actual needs, which turned out to be much simpler than what enterprise CRMs offer.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "The CRM tracks contacts, logs interactions, and provides basic reporting. It's designed to be learned in minutes, not days. The software is open source and can be self-hosted.",
      },
      {
        type: "text",
        title: "Impact",
        content: "The CRM is now used by over 50 small nonprofits. It's become one of Hack4Impact's most forked repositories.",
      },
    ],
    team: [
      { name: "Thomas Huang", role: "Tech Lead" },
      { name: "Uma Patel", role: "Project Manager" },
      { name: "Victor Martinez", role: "Designer" },
      { name: "Wendy Chen", role: "Developer" },
      { name: "Xavier Jones", role: "Developer" },
      { name: "Yolanda Smith", role: "Developer" },
      { name: "Zachary Lee", role: "Developer" },
      { name: "Alice Wang", role: "Developer" },
    ],
    duration: "12 months",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    github: "https://github.com/hack4impact-uiuc/nonprofit-crm",
  },
  {
    id: "12",
    slug: "community-garden-manager",
    title: "Community Garden Plot Manager",
    partner: "Boston Urban Growers",
    chapter: "Boston University",
    year: "2024",
    tag: "Web App",
    description: "A system for managing community garden plot assignments, waitlists, and gardener communications.",
    intro: "Boston Urban Growers manages 15 community gardens across the city. Plot assignments, waitlists, and gardener communications were managed through a combination of paper forms and email.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "With hundreds of gardeners across multiple locations, keeping track of plot assignments, payments, and rule compliance was overwhelming. The waitlist alone was a spreadsheet with over 500 names.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We mapped out the entire gardener lifecycle from application to plot assignment to renewal, identifying pain points at each stage.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "Gardeners can apply online, join waitlists, and manage their plot through a portal. Coordinators can assign plots, send bulk communications, and track rule compliance. Automated reminders reduce administrative work.",
      },
      {
        type: "text",
        title: "Impact",
        content: "Plot turnover communication that took a week now happens automatically. Waitlist management is transparent, and gardeners can see their position in real-time.",
      },
    ],
    team: [
      { name: "Brian Murphy", role: "Tech Lead" },
      { name: "Catherine Zhao", role: "Project Manager" },
      { name: "Dylan Park", role: "Developer" },
      { name: "Elena Rodriguez", role: "Developer" },
    ],
    duration: "5 months",
    technologies: ["React", "Express", "MongoDB", "Mailchimp API"],
    website: "https://bostonurbangrowers.org",
    github: "https://github.com/hack4impact-bu/community-garden",
  },
  {
    id: "13",
    slug: "disability-services-portal",
    title: "Disability Services Request Portal",
    partner: "Access Pittsburgh",
    chapter: "CMU",
    year: "2024",
    tag: "Web App",
    description: "An accessible portal for people with disabilities to request accommodations and services.",
    intro: "Access Pittsburgh provides services to people with disabilities across the region. Their intake process relied on phone calls during business hours, which was inaccessible for some clients.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "The existing intake process required phone calls, which was difficult for deaf and hard-of-hearing clients. Forms needed to be highly accessible while still collecting necessary information.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We followed WCAG 2.1 AAA guidelines and tested with users who have various disabilities. Every feature was validated with actual users before implementation.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "The portal meets the highest accessibility standards with screen reader optimization, keyboard navigation, and high contrast options. Clients can request services, upload documentation, and track their requests online.",
      },
      {
        type: "text",
        title: "Impact",
        content: "Service requests increased 25% after launch as the portal removed barriers that had prevented some clients from seeking help.",
      },
    ],
    team: [
      { name: "Frank Anderson", role: "Tech Lead" },
      { name: "Grace Taylor", role: "Project Manager" },
      { name: "Henry Kim", role: "Designer" },
      { name: "Ivy Chen", role: "Developer" },
      { name: "James Wilson", role: "Developer" },
    ],
    duration: "7 months",
    technologies: ["React", "Node.js", "PostgreSQL", "axe-core"],
    website: "https://accesspgh.org",
    github: "https://github.com/hack4impact-cmu/disability-services",
  },
  {
    id: "14",
    slug: "youth-mentorship-platform",
    title: "Youth Mentorship Matching Platform",
    partner: "Los Angeles Youth Network",
    chapter: "UCLA",
    year: "2024",
    tag: "Web App",
    description: "A platform matching at-risk youth with mentors based on interests, goals, and compatibility.",
    intro: "The Los Angeles Youth Network pairs at-risk youth with adult mentors. Finding good matches and tracking relationship progress was challenging at scale.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Mentor-mentee compatibility is crucial for program success. Poor matches lead to early dropout, which can be harmful for youth who already struggle with trusting adults.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We worked with program staff and developmental psychologists to identify factors that predict successful matches. The system needed to support staff judgment, not replace it.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "The platform suggests potential matches based on interests, location, and availability, but staff make final decisions. Progress tracking helps identify relationships that may need additional support.",
      },
      {
        type: "text",
        title: "Impact",
        content: "Match success rates (measured by 1-year retention) improved from 60% to 78%. Staff can now manage more mentorship pairs with better outcomes.",
      },
    ],
    team: [
      { name: "Karen Lee", role: "Tech Lead" },
      { name: "Leo Martinez", role: "Project Manager" },
      { name: "Monica Patel", role: "Designer" },
      { name: "Nathan Wright", role: "Developer" },
      { name: "Olivia Brown", role: "Developer" },
      { name: "Peter Chang", role: "Developer" },
    ],
    duration: "8 months",
    technologies: ["Next.js", "Python", "PostgreSQL", "ML"],
    github: "https://github.com/hack4impact-ucla/youth-mentorship",
  },
  {
    id: "15",
    slug: "grant-tracker",
    title: "Grant Application Tracker",
    partner: "Providence Nonprofit Consortium",
    chapter: "Brown",
    year: "2024",
    tag: "Web App",
    description: "A tool for nonprofits to track grant opportunities, deadlines, and application materials.",
    intro: "Small nonprofits in Providence were missing grant opportunities due to disorganized tracking of deadlines and requirements. The consortium wanted to help members be more successful in securing funding.",
    sections: [
      {
        type: "text",
        title: "The Challenge",
        content: "Grant applications require extensive documentation and have strict deadlines. Small nonprofits without dedicated grant writers often missed opportunities or submitted incomplete applications.",
      },
      {
        type: "text",
        title: "Our Approach",
        content: "We created a shared database of grant opportunities and a system to track each organization's application pipeline.",
      },
      {
        type: "text",
        title: "The Solution",
        content: "Organizations can browse grants, save opportunities to their pipeline, and track required materials. Automated reminders ensure deadlines aren't missed, and successful applications can be used as templates.",
      },
      {
        type: "text",
        title: "Impact",
        content: "Consortium members report 30% more grant applications submitted, with higher success rates due to better preparation.",
      },
    ],
    team: [
      { name: "Quinn Davis", role: "Tech Lead" },
      { name: "Rachel Kim", role: "Project Manager" },
      { name: "Samuel Johnson", role: "Developer" },
      { name: "Tina Wang", role: "Developer" },
    ],
    duration: "5 months",
    technologies: ["React", "Supabase", "Tailwind CSS"],
    website: "https://pvdnonprofits.org/grants",
    github: "https://github.com/hack4impact-brown/grant-tracker",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
