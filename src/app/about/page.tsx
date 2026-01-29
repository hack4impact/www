import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const operationsTeam = [
  { name: "Sarah Chen", title: "Executive Director", contact: "sarah@hack4impact.org" },
  { name: "Marcus Johnson", title: "Director of Programs", contact: "marcus@hack4impact.org" },
  { name: "Emily Rodriguez", title: "Director of Partnerships", contact: "emily@hack4impact.org" },
  { name: "David Kim", title: "Director of Operations", contact: "david@hack4impact.org" },
];

const boardOfDirectors = [
  { name: "Dr. James Mitchell", title: "Board Chair", contact: "james@hack4impact.org" },
  { name: "Amanda Foster", title: "Vice Chair", contact: "amanda@hack4impact.org" },
  { name: "Robert Nguyen", title: "Treasurer", contact: "robert@hack4impact.org" },
  { name: "Lisa Park", title: "Secretary", contact: "lisa@hack4impact.org" },
];

const advisoryBoard = [
  { name: "Michael Torres", title: "CTO, TechForGood", website: "techforgood.org" },
  { name: "Jennifer Walsh", title: "VP Engineering, Stripe", website: "stripe.com" },
  { name: "Daniel Okonkwo", title: "Founder, ImpactLabs", website: "impactlabs.io" },
];

const values = [
  {
    title: "Sustainable",
    description: "We build lasting solutions that continue to serve communities long after our initial engagement.",
    icon: "/icons/sustain.svg",
  },
  {
    title: "Ethical",
    description: "We prioritize the needs and privacy of the communities we serve in every decision we make.",
    icon: "/icons/ethics.svg",
  },
  {
    title: "Accessible",
    description: "We design inclusive software that works for everyone, regardless of ability or background.",
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
        {/* Image placeholder - portrait */}
        <div className="px-8 lg:px-0 lg:pl-12 py-8 lg:py-12">
          <div className="bg-gradient-to-br from-purple-100 to-blue-300 aspect-[4/5] w-full" />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <h2 className="font-sans text-3xl md:text-4xl">Our story</h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg">
            Founded by students who believed technology could be a force for good, Hack4Impact began as a small group of developers volunteering their skills for local nonprofits. What started as weekend projects quickly grew into a nationwide network of chapters, each dedicated to bridging the gap between student talent and community needs. Today, we continue that mission, empowering the next generation of technologists to build with purpose and impact.
          </p>
        </div>
      </section>

      {/* Team Sections */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        {/* Operations Team */}
        <div id="operations-team" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl md:text-3xl font-sans mb-8">Operations Team</h2>
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
                <a href={`mailto:${member.contact}`} className="font-serif text-gray-600 hover:text-gray-900">{member.contact}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Board of Directors */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-sans mb-8">Board of Directors</h2>
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
                <a href={`mailto:${member.contact}`} className="font-serif text-gray-600 hover:text-gray-900">{member.contact}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div>
          <h2 className="text-2xl md:text-3xl font-sans mb-8">Advisory Board</h2>
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
                <a href={`https://${member.website}`} target="_blank" rel="noopener noreferrer" className="font-serif text-gray-600 hover:text-gray-900">{member.website}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
