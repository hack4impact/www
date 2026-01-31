import { getChapters, getVolunteerCounts } from "@/lib/notion/api";
import { ChaptersDataTable } from "@/components/ui/ChaptersDataTable";
import { CardGrid } from "@/components/ui/CardGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { StatBar } from "@/components/ui/StatBar";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { Code, ColorFilter, Agile, KanbanBoard } from "iconoir-react";

const iconProps = { width: 64, height: 64, strokeWidth: 1 } as const;

const roles = [
  {
    icon: <Code {...iconProps} />,
    title: "Developer",
    description:
      "Build features, write tests, and ship code using modern frameworks. Most teams use React, Next.js, or React Native.",
  },
  {
    icon: <ColorFilter {...iconProps} />,
    title: "Designer",
    description:
      "Lead user research, create wireframes and prototypes, and ensure the final product is intuitive and accessible.",
  },
  {
    icon: <Agile {...iconProps} />,
    title: "Tech Lead",
    description:
      "Guide technical architecture, conduct code reviews, and mentor developers while keeping the project on track.",
  },
  {
    icon: <KanbanBoard {...iconProps} />,
    title: "Project Manager",
    description:
      "Coordinate between the team and the nonprofit partner, run standups, and manage scope and timelines.",
  },
];

const faqs = [
  {
    question: "Do I need prior experience?",
    answer:
      "It depends on the chapter and role. Most chapters look for some programming coursework for developers, but designers and PMs come from varied backgrounds. Check with your local chapter for specifics.",
  },
  {
    question: "How much time does it take?",
    answer:
      "Expect around 5–10 hours per week during the semester, including team meetings, development time, and partner check-ins.",
  },
  {
    question: "When can I apply?",
    answer:
      "Most chapters recruit at the start of each semester (fall and spring). Applications typically open a few weeks before the semester begins.",
  },
];

export default async function ChaptersPage() {
  const [chapters, volunteerCounts] = await Promise.all([
    getChapters(),
    getVolunteerCounts(),
  ]);

  const stats = [
    { label: "Active chapters", value: chapters.length },
    { label: "Total volunteers", value: volunteerCounts.total },
    { label: "Active volunteers", value: volunteerCounts.active },
  ];

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100" />

      <PageIntro
        heading="Chapters"
        description="Hack4Impact operates through student-led chapters at universities across the country. Each chapter partners with local nonprofits to build software that serves their communities."
      />

      <StatBar stats={stats} />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <ChaptersDataTable chapters={chapters} />
      </section>

      <CardGrid
        heading="Join a chapter"
        description="Each chapter is made up of students filling different roles. Here are the positions you can apply for at your local chapter."
        items={roles}
        columns={4}
      />

      <FAQList items={faqs} />

      <CallToAction
        heading="No chapter at your school?"
        buttonText="Start one"
        href="/students"
        color="bg-green-100"
      />
    </>
  );
}
