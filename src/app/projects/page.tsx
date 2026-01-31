import { getProjects } from "@/lib/notion/api";
import { getFAQs } from "@/lib/contentful/api";
import { ProjectsDataTable } from "@/components/ui/ProjectsDataTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { StatBar } from "@/components/ui/StatBar";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";

export default async function ProjectsPage() {
  const [projects, faqs] = await Promise.all([
    getProjects(),
    getFAQs("Project Questions"),
  ]);
  const doneProjects = projects.filter((p) => p.status === "Done");

  const uniquePartners = new Set(doneProjects.map((p) => p.partner)).size;
  const totalSemesters = doneProjects.reduce((sum, p) => {
    const terms = p.duration ? p.duration.split(",").filter(Boolean).length : 0;
    return sum + (terms || 1);
  }, 0);

  const stats = [
    { label: "Projects completed", value: doneProjects.length },
    { label: "Partners served", value: uniquePartners },
    { label: "Semesters of work", value: totalSemesters },
  ];

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100" />

      <PageIntro
        heading="Projects"
        description="Each project represents a semester of collaboration between a student team and a nonprofit partner. Browse our portfolio to see the software we've shipped and the communities we've served."
      />

      <StatBar stats={stats} />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <ProjectsDataTable projects={projects} />
      </section>

      <FAQList items={faqs} />

      <CallToAction
        heading="Have a project idea?"
        buttonText="Become a partner"
        href="/nonprofits"
        color="bg-purple-100"
      />
    </>
  );
}
