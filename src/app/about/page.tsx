import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { TeamTable } from "@/components/ui/TeamTable";
import { CallToAction } from "@/components/ui/CallToAction";

const operationsTeam = [
  {
    name: "Khoa Ly",
    title: "Executive Officer",
    contact: "khoa@hack4impact.org",
  },
  {
    name: "Govind Singhal",
    title: "Programs Officer",
    contact: "marcus@hack4impact.org",
  },
  {
    name: "Brian Kwong",
    title: "Finance Officer",
    contact: "emily@hack4impact.org",
  },
  {
    name: "Sophia Change",
    title: "Projects Officer",
    contact: "david@hack4impact.org",
  },
];

const boardOfDirectors = [
  {
    name: "Ayaan Kazerouni",
    title: "Professor of Computer Science at Cal Poly",
    contact: "ayaan@hack4impact.org",
  },
  {
    name: "Dhruv Maheshwari",
    title: "Co-Founder of Obvio and Hack4Impact",
    contact: "dhruv@hack4impact.org",
  },
  {
    name: "James Wang",
    title: "Software Engineer & Ex-Executive Officer",
    contact: "james@hack4impact.org",
  },
  {
    name: "Jamie Wang",
    title: "Revenue Ops Manager at Merge",
    contact: "jamie@hack4impact.org",
  },
  {
    name: "Javid Fathi",
    title: "Software Engineer Lead at Microsoft",
    contact: "javid@hack4impact.org",
  },
];

const advisoryBoard = [
  {
    name: "Aakash Singhal",
    title: "Ex-Product Manager at Deloitte",
    website: "stripe.com",
  },
  {
    name: "Chae Eun Park",
    title: "UX Researcher at ServiceNow",
    website: "chaeeunpark.com",
  },
];

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

export default function AboutPage() {
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
              { text: m.contact, href: `mailto:${m.contact}` },
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
              { text: m.contact, href: `mailto:${m.contact}` },
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
              { text: m.website, href: `https://${m.website}` },
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
