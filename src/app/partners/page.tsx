import { getPartners } from "@/lib/notion/api";
import { PartnersDataTable } from "@/components/ui/PartnersDataTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { StatBar } from "@/components/ui/StatBar";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";

const faqs = [
  {
    question: "How do we apply to become a partner?",
    answer:
      "Organizations can apply through our website during our open application period each semester. We look for nonprofits with a clear technology need and a willingness to collaborate closely with a student team throughout the project.",
  },
  {
    question: "What does the partnership process look like?",
    answer:
      "After selection, partners are matched with a chapter and student team. The process includes a discovery phase to define requirements, regular check-ins throughout the semester, and a final handoff with documentation and training on the delivered product.",
  },
  {
    question: "Is there a cost to partner with Hack4Impact?",
    answer:
      "No. Our services are completely free for nonprofit partners. Our mission is to make technology accessible to organizations that are creating social good, regardless of their budget.",
  },
];

export default async function PartnersPage() {
  const partners = await getPartners();

  const uniqueSubjects = new Set(
    partners.flatMap((p) => p.subjects ?? []),
  ).size;
  const uniquePopulations = new Set(
    partners.flatMap((p) => p.populations ?? []),
  ).size;

  const stats = [
    { label: "Partners", value: partners.length },
    { label: "Focus areas", value: uniqueSubjects },
    { label: "Populations served", value: uniquePopulations },
  ];

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100" />

      <PageIntro
        heading="Partners"
        description="We work with nonprofit organizations across the country to build software that strengthens their missions. Here are the partners we've had the privilege of serving."
      />

      <StatBar stats={stats} />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <PartnersDataTable partners={partners} />
      </section>

      <FAQList items={faqs} />

      <CallToAction
        heading="Want to work with us?"
        buttonText="Apply to partner"
        href="/nonprofits"
        color="bg-orange-100"
      />
    </>
  );
}
