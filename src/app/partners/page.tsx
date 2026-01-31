import { getPartners } from "@/lib/notion/api";
import { getFAQs } from "@/lib/contentful/api";
import { PartnersDataTable } from "@/components/ui/PartnersDataTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { StatBar } from "@/components/ui/StatBar";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";

export default async function PartnersPage() {
  const [partners, faqs] = await Promise.all([
    getPartners(),
    getFAQs("Partner Questions"),
  ]);

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
