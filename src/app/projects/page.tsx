import {
  getProjects,
  getChapters,
  getVolunteerCounts,
  getDoneProjectCount,
} from "@/lib/services/notion";
import { ProjectsDataTable } from "@/components/ui/ProjectsDataTable";
import { PageIntro } from "@/components/ui/PageIntro";
import { StatBar } from "@/components/ui/StatBar";
import { FAQList } from "@/components/ui/FAQList";

const faqs = [
  {
    question: "How long does a typical project last?",
    answer:
      "Most projects run for one semester (around 14 weeks), though some larger engagements span two semesters. Teams work in agile sprints throughout the term, culminating in a final handoff to the partner organization.",
  },
  {
    question: "What technologies do teams use?",
    answer:
      "Our teams choose the best tools for each project. Common choices include React, Next.js, Node.js, Python, and various cloud platforms. Technology decisions are made collaboratively between the team and the partner based on project requirements.",
  },
  {
    question: "How are projects selected?",
    answer:
      "Nonprofit partners apply through our partnership process each semester. Projects are selected based on feasibility, social impact potential, and alignment with our chapter's capabilities. We prioritize organizations that serve underrepresented communities.",
  },
];

export default async function ProjectsPage() {
  const [projects, chapters, volunteerCounts, doneProjectCount] =
    await Promise.all([
      getProjects(),
      getChapters(),
      getVolunteerCounts(),
      getDoneProjectCount(),
    ]);

  const stats = [
    { label: "Projects completed", value: doneProjectCount },
    { label: "Active chapters", value: chapters.length },
    { label: "Total volunteers", value: volunteerCounts.total },
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
    </>
  );
}
