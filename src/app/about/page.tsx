import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { TeamTable } from "@/components/ui/TeamTable";
import { CallToAction } from "@/components/ui/CallToAction";
import { getBoardTeamMembers } from "@/lib/services/contentful";

const values = [
  {
    title: "Sustainable",
    description:
      "We build lasting solutions that continue to serve communities long after our initial engagement.",
    icon: "/icons/sustain.svg",
  },
  {
    title: "Ethical",
    description:
      "We prioritize the needs and privacy of the communities we serve in every decision we make.",
    icon: "/icons/ethics.svg",
  },
  {
    title: "Accessible",
    description:
      "We design inclusive software that works for everyone, regardless of ability or background.",
    icon: "/icons/access.svg",
  },
];

export default async function AboutPage() {
  const members = await getBoardTeamMembers();
  const operationsTeam = members.filter((m) => m.team === "Operations Team");
  const boardOfDirectors = members.filter((m) => m.team === "Board of Directors");
  const advisoryBoard = members.filter((m) => m.team === "Advisory Board");

  return (
    <>
      <SplitHero
        heading="Creating software to support those supporting their communities"
        buttonText="Meet the Team"
        buttonHref="#operations-team"
        gradient="from-blue-100 to-green-200"
      />

      <CardGrid heading="Our values" items={values} />

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-8 lg:px-0 lg:pl-8 py-8 lg:py-12">
          <div className="aspect-[4/5] w-full bg-gradient-to-br from-orange-100 to-pink-200" />
        </div>

        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <h2 className="font-sans text-3xl md:text-4xl">Our story</h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg">
            Founded by students who believed technology could be a force for
            good, Hack4Impact began as a small group of developers volunteering
            their skills for local nonprofits. What started as weekend projects
            quickly grew into a nationwide network of chapters, each dedicated
            to bridging the gap between student talent and community needs.
            Today, we continue that mission, empowering the next generation of
            technologists to build with purpose and impact.
          </p>
        </div>
      </section>

      {/* Team Sections */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <TeamTable
          id="operations-team"
          heading="Operations Team"
          columns={["Name", "Title", "Contact"]}
          members={operationsTeam.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              { text: m.email ?? "", href: m.email ? `mailto:${m.email}` : undefined },
            ],
          }))}
          className="mb-16"
        />

        <TeamTable
          heading="Board of Directors"
          columns={["Name", "Title", "Contact"]}
          members={boardOfDirectors.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              { text: m.email ?? "", href: m.email ? `mailto:${m.email}` : undefined },
            ],
          }))}
          className="mb-16"
        />

        <TeamTable
          heading="Advisory Board"
          columns={["Name", "Title", "Website"]}
          members={advisoryBoard.map((m) => ({
            cells: [
              { text: m.name },
              { text: m.title },
              { text: m.website ?? "", href: m.website ? m.website : undefined },
            ],
          }))}
        />
      </section>

      <CallToAction
        heading="Want to join our team?"
        buttonText="Get involved"
        href="/students"
      />
    </>
  );
}
