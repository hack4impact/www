import { Separator } from "@base-ui/react/separator";
import { SplitHero } from "@/components/ui/SplitHero";
import { CallToAction } from "@/components/ui/CallToAction";
import { StatBar } from "@/components/ui/StatBar";
import { TeamTable } from "@/components/ui/TeamTable";
import {
  getChapters,
  getProjects,
  getPartners,
  getVolunteerCounts,
} from "@/lib/services/notion";

async function getStats() {
  const [chapters, projects, partners, volunteerCounts] = await Promise.all([
    getChapters(),
    getProjects(),
    getPartners(),
    getVolunteerCounts(),
  ]);

  const doneProjects = projects.filter((p) => p.status === "Done");

  return [
    { value: volunteerCounts.active, label: "Active volunteers" },
    { value: doneProjects.length, label: "Projects completed" },
    { value: partners.length, label: "Nonprofit partners" },
    { value: chapters.length, label: "University chapters" },
  ];
}

const sponsorshipTiers = [
  {
    benefit: "Annual Contribution",
    community: "$5,000",
    partner: "$15,000",
    champion: "$30,000+",
  },
  {
    benefit: "Logo on Website",
    community: "✓",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Social Media Recognition",
    community: "✓",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Presence at Chapter Events",
    community: "✓",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Access to Talent Network",
    community: "",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Featured Journal Spotlight",
    community: "",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Priority Mentorship Matching",
    community: "",
    partner: "✓",
    champion: "✓",
  },
  {
    benefit: "Co-Branded Events",
    community: "",
    partner: "",
    champion: "✓",
  },
  {
    benefit: "Keynote Speaking Opportunities",
    community: "",
    partner: "",
    champion: "✓",
  },
  {
    benefit: "Strategic Initiative Input",
    community: "",
    partner: "",
    champion: "✓",
  },
];

const fundingAreas = [
  {
    title: "Infrastructure",
    description:
      "Cloud hosting, domain names, and development tools that our teams rely on to build and ship projects.",
  },
  {
    title: "Events",
    description:
      "Chapter kickoffs, hackathons, demo days, and our annual national showcase that brings the community together.",
  },
  {
    title: "Operations",
    description:
      "Design tools, project management software, and communication platforms that keep our chapters running smoothly.",
  },
  {
    title: "Growth",
    description:
      "New chapter launches, leadership training programs, and outreach efforts to expand our reach to more universities.",
  },
];

export default async function SponsorsPage() {
  const stats = await getStats();

  return (
    <>
      <SplitHero
        heading="Support Hack4Impact"
        description="Your sponsorship enables student-driven technology for social good. Fund the tools, events, and infrastructure that power our chapters and the nonprofits they serve."
        buttonText="Become a sponsor"
        buttonHref="#contact"
        gradient="from-orange-100 to-orange-200"
      />

      <StatBar heading="Our impact" stats={stats} />

      {/* Sponsorship Tiers Table */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <TeamTable
          heading="Sponsorship tiers"
          columns={["Benefits", "Community", "Partner", "Champion"]}
          members={sponsorshipTiers.map((tier, index) => ({
            cells: [
              { text: tier.benefit, className: index === 0 ? "font-sans font-semibold" : undefined },
              { text: tier.community, className: index === 0 ? "font-serif text-gray-600 font-semibold" : undefined },
              { text: tier.partner, className: index === 0 ? "font-serif text-gray-600 font-semibold" : undefined },
              { text: tier.champion, className: index === 0 ? "font-serif text-gray-600 font-semibold" : undefined },
            ],
          }))}
        />
      </section>

      {/* Where Your Money Goes */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          Where your support goes
        </h2>
        <Separator className="max-w-3xl mx-auto border-t border-gray-200" />
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {fundingAreas.map((area) => (
            <div key={area.title} className="py-6">
              <h3 className="font-sans text-lg mb-1">{area.title}</h3>
              <p className="font-serif text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <CallToAction
        id="contact"
        heading="Interested in sponsoring?"
        buttonText="Get in touch"
        href="mailto:contact@hack4impact.org"
        color="bg-orange-100"
      />
    </>
  );
}
