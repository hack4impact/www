export interface Partner {
  id: string;
  slug: string;
  name: string;
  location: string;
  projectCount: number;
  description: string;
  website?: string;
  organizationTypes?: string[];
  populations?: string[];
  subjects?: string[];
}

export const partners: Partner[] = [
  {
    id: "1",
    slug: "atlanta-community-food-bank",
    name: "Atlanta Community Food Bank",
    location: "Atlanta, GA",
    projectCount: 1,
    description: "Works to end hunger with the food, people, and big ideas to ensure our neighbors have the nourishment they need to thrive. ",
    website: "https://acfb.org",
  },
  {
    id: "2",
    slug: "hands-on-chicago",
    name: "Hands On Chicago",
    location: "Chicago, IL",
    projectCount: 1,
    description: "Connects volunteers with nonprofit organizations across the city, making it easy for people to make a difference.",
    website: "https://handsonchicago.org",
  },
  {
    id: "3",
    slug: "philadelphia-legal-assistance",
    name: "Philadelphia Legal Assistance",
    location: "Philadelphia, PA",
    projectCount: 1,
    description: "Provides free civil legal services to low-income Philadelphians, helping them navigate complex legal challenges.",
  },
  {
    id: "4",
    slug: "bay-area-wildlife-foundation",
    name: "Bay Area Wildlife Foundation",
    location: "San Francisco, CA",
    projectCount: 1,
    description: "Dedicated to the conservation of Northern California's native wildlife and their habitats through research and public engagement.",
  },
  {
    id: "5",
    slug: "austin-youth-education-initiative",
    name: "Austin Youth Education Initiative",
    location: "Austin, TX",
    projectCount: 1,
    description: "Offers free tutoring and educational support to K-12 students from underserved communities in the Austin area.",
    website: "https://austinyouth.org",
  },
  {
    id: "6",
    slug: "michigan-humane-society",
    name: "Michigan Humane Society",
    location: "Detroit, MI",
    projectCount: 1,
    description: "The state's oldest and largest animal welfare organization, committed to saving and celebrating animals.",
  },
  {
    id: "7",
    slug: "triangle-mental-health-alliance",
    name: "Triangle Mental Health Alliance",
    location: "Raleigh, NC",
    projectCount: 1,
    description: "Works to improve the lives of individuals and families affected by mental illness through support, education, and advocacy.",
    website: "https://trianglemha.org",
  },
  {
    id: "8",
    slug: "welcome-center-for-new-americans",
    name: "Welcome Center for New Americans",
    location: "Ithaca, NY",
    projectCount: 1,
    description: "Provides guidance and resources to help refugees and immigrants navigate their new lives in upstate New York.",
  },
  {
    id: "9",
    slug: "california-coastal-commission",
    name: "California Coastal Commission",
    location: "San Luis Obispo, CA",
    projectCount: 1,
    description: "A state agency dedicated to protecting and enhancing California’s coast for present and future generations.",
    website: "https://coastal.ca.gov",
  },
  {
    id: "10",
    slug: "dc-housing-authority",
    name: "DC Housing Authority",
    location: "Washington, D.C.",
    projectCount: 1,
    description: "Provides quality affordable housing to low- and moderate-income households in the District of Columbia.",
    website: "https://dchousing.org",
  },
  {
    id: "11",
    slug: "illinois-nonprofit-association",
    name: "Illinois Nonprofit Association",
    location: "Champaign, IL",
    projectCount: 1,
    description: "A membership organization that provides resources, training, and advocacy for nonprofits across Illinois.",
  },
  {
    id: "12",
    slug: "boston-urban-growers",
    name: "Boston Urban Growers",
    location: "Boston, MA",
    projectCount: 1,
    description: "Manages community gardens and urban farms to increase access to fresh, healthy food in Boston's neighborhoods.",
    website: "https://bostonurbangrowers.org",
  },
  {
    id: "13",
    slug: "access-pittsburgh",
    name: "Access Pittsburgh",
    location: "Pittsburgh, PA",
    projectCount: 1,
    description: "An organization committed to ensuring people with disabilities have full access to services and opportunities in the Pittsburgh region.",
  },
  {
    id: "14",
    slug: "los-angeles-youth-network",
    name: "Los Angeles Youth Network",
    location: "Los Angeles, CA",
    projectCount: 1,
    description: "Provides support and mentorship to at-risk and homeless youth in Los Angeles.",
  },
  {
    id: "15",
    slug: "providence-nonprofit-consortium",
    name: "Providence Nonprofit Consortium",
    location: "Providence, RI",
    projectCount: 1,
    description: "A coalition of nonprofits working together to improve the quality of life in Providence through shared resources and collaboration.",
    website: "https://pvdnonprofits.org",
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((partner) => partner.slug === slug);
}
