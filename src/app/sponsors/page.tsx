import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CallToAction } from "@/components/ui/CallToAction";

const stats = [
  { value: "500+", label: "Students supported" },
  { value: "80+", label: "Projects shipped" },
  { value: "50+", label: "Nonprofit partners" },
  { value: "13", label: "University chapters" },
];

const tiers = [
  {
    icon: "/icons/sustain.svg",
    title: "Community",
    description:
      "Logo on our website, shout-outs on social media, and a presence at chapter events. A great way to show your support.",
  },
  {
    icon: "/icons/ethics.svg",
    title: "Partner",
    description:
      "Everything in Community, plus access to our talent network for recruiting, a featured sponsor spotlight in our journal, and priority mentorship matching.",
  },
  {
    icon: "/icons/access.svg",
    title: "Champion",
    description:
      "Everything in Partner, plus co-branded events, keynote opportunities at our national showcase, and direct input on strategic initiatives.",
  },
];

const fundingAreas = [
  {
    title: "Infrastructure",
    description:
      "Cloud hosting, domain names, and development tools that our teams rely on to build and ship projects.",
  },
  {
    title: "Events",
    description:
      "Chapter kickoffs, hackathons, demo days, and our annual national showcase that brings the community together.",
  },
  {
    title: "Operations",
    description:
      "Design tools, project management software, and communication platforms that keep our chapters running smoothly.",
  },
  {
    title: "Growth",
    description:
      "New chapter launches, leadership training programs, and outreach efforts to expand our reach to more universities.",
  },
];

export default function SponsorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="min-h-80 md:min-h-0 relative">
          <Image
            src="/images/old.jpg"
            alt="Hack4Impact community"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Support Hack4Impact
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            Your sponsorship enables student-driven technology for social good. Fund the tools, events, and infrastructure that power our chapters and the nonprofits they serve.
          </p>
          <div className="mt-6">
            <Link href="#contact">
              <Button>Become a sponsor</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">Our impact</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-sans">{stat.value}</p>
              <p className="mt-2 font-serif text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">Sponsorship tiers</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.title}
              icon={<Image src={tier.icon} alt="" width={45} height={45} />}
              title={tier.title}
              description={tier.description}
            />
          ))}
        </div>
      </section>

      {/* Where Your Money Goes */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          Where your support goes
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-gray-200">
          {fundingAreas.map((area) => (
            <div key={area.title} className="py-6">
              <h3 className="font-sans text-lg mb-1">{area.title}</h3>
              <p className="font-serif text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <CallToAction
        id="contact"
        heading="Interested in sponsoring?"
        buttonText="Get in touch"
        href="mailto:contact@hack4impact.org"
        color="bg-orange-100"
      />
    </>
  );
}
