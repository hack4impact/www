import { getPartners } from "@/lib/services/notion";
import { PartnersDataTable } from "@/components/ui/PartnersDataTable";
import { PageIntro } from "@/components/ui/PageIntro";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100" />

      <PageIntro
        heading="Partners"
        description="We work with nonprofit organizations across the country to build software that strengthens their missions. Here are the partners we've had the privilege of serving."
      />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <PartnersDataTable partners={partners} />
      </section>
    </>
  );
}
