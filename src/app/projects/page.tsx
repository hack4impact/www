import { getProjects } from "@/lib/services/notion";
import { ProjectsDataTable } from "@/components/ui/ProjectsDataTable";
import { PageIntro } from "@/components/ui/PageIntro";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100" />

      <PageIntro
        heading="Projects"
        description="Each project represents a semester of collaboration between a student team and a nonprofit partner. Browse our portfolio to see the software we've shipped and the communities we've served."
      />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <ProjectsDataTable projects={projects} />
      </section>
    </>
  );
}
