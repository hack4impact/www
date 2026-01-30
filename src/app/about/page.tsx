import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <div className="min-h-80 md:min-h-0 aspect-[3/4] md:aspect-auto relative">
          <Image
            src="/images/surf.jpg"
            alt="Students surfing"
            fill
            className="object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Creating software to support those supporting their communities
          </h1>
          <div className="mt-6">
            <Link href="#operations-team">
              <Button>Meet the Team</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">Our values</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card
              key={value.title}
              icon={<Image src={value.icon} alt="" width={45} height={45} />}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="px-8 lg:px-0 lg:pl-8 py-8 lg:py-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/old.jpg"
              alt="Early Hack4Impact team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text content */}
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
        {/* Operations Team */}
        <div id="operations-team" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl md:text-3xl font-sans mb-8">
            Operations Team
          </h2>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 py-3 font-mono text-sm text-gray-500">
              <span>Name</span>
              <span>Title</span>
              <span>Contact</span>
            </div>
            {operationsTeam.map((member) => (
              <div key={member.name} className="grid grid-cols-3 py-4">
                <span className="font-sans">{member.name}</span>
                <span className="font-serif text-gray-600">{member.title}</span>
                <a
                  href={`mailto:${member.contact}`}
                  className="font-serif text-gray-600 hover:text-gray-900"
                >
                  {member.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans mb-8">
            Board of Directors
          </h2>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 py-3 font-mono text-sm text-gray-500">
              <span>Name</span>
              <span>Title</span>
              <span>Contact</span>
            </div>
            {boardOfDirectors.map((member) => (
              <div key={member.name} className="grid grid-cols-3 py-4">
                <span className="font-sans">{member.name}</span>
                <span className="font-serif text-gray-600">{member.title}</span>
                <a
                  href={`mailto:${member.contact}`}
                  className="font-serif text-gray-600 hover:text-gray-900"
                >
                  {member.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans mb-8">
            Advisory Board
          </h2>
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-3 py-3 font-mono text-sm text-gray-500">
              <span>Name</span>
              <span>Title</span>
              <span>Website</span>
            </div>
            {advisoryBoard.map((member) => (
              <div key={member.name} className="grid grid-cols-3 py-4">
                <span className="font-sans">{member.name}</span>
                <span className="font-serif text-gray-600">{member.title}</span>
                <a
                  href={`https://${member.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-gray-600 hover:text-gray-900"
                >
                  {member.website}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        heading="Want to join our team?"
        buttonText="Get involved"
        href="/students"
      />
    </>
  );
}
