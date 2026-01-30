import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NumberedSteps } from "@/components/ui/NumberedSteps";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";

const reasons = [
  {
    icon: "/icons/professionals.svg",
    title: "Leadership",
    description:
      "Build and lead a team of developers, designers, and project managers. Gain hands-on experience running a student organization from the ground up.",
  },
  {
    icon: "/icons/nonprofits.svg",
    title: "Impact",
    description:
      "Connect your campus to local nonprofits and deliver real software that makes a difference in your community.",
  },
  {
    icon: "/icons/students.svg",
    title: "Community",
    description:
      "Join a national network of chapter leaders who share resources, advice, and support across dozens of universities.",
  },
];

const steps = [
  {
    number: "01",
    title: "Express Interest",
    description:
      "Reach out to us with a brief intro about yourself, your school, and why you want to start a chapter.",
  },
  {
    number: "02",
    title: "Apply",
    description:
      "Fill out a short application so we can learn more about your plans, your founding team, and your campus community.",
  },
  {
    number: "03",
    title: "Learn",
    description:
      "Join our chapter establishment program as part of a cohort of founders. We provide training, materials, guidance, and support as your founding team completes their first project.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Upon success, you will become an official chapter. Recruit developers, designers, and project managers from your campus. Engage with the greater Hack for Impact community.We'll help you through the first year of being a chapter.",
  },
  {
    number: "05",
    title: "Grow",
    description:
      "Partner with local nonprofits, deliver more projects, engage with the larger Hack for Impact community, and establish your chapter as a lasting part of your campus.",
  },
];

const faqs = [
  {
    question: "Who can start a chapter?",
    answer:
      "Any current undergraduate or graduate student at an accredited university. You don't need to be a CS major — just passionate about tech and social good. Starting a chapter is a lot of work and we do ask for unique founder expertise or long-term committment.",
  },
  {
    question: "What support does Hack4Impact provide?",
    answer:
      "We provide hands-on guidance and training for your founding team through our chapter establishment program. As a chapter, you will gain access to branding assets, operational playbooks, technical tools, fundraising capabilites, nonprofit outreach templates, and ongoing mentorship from central leadership and other chapter founders.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "The application and approval process typically takes a few weeks. The chapter establishment program takes about a semester to finish. Most new chapters are ready to recruit members and take on their new projects within one semester.",
  },
  {
    question: "Are there any costs?",
    answer:
      "No. Hack4Impact is a volunteer-driven organization. There are no fees to start or run a chapter.",
  },
];

export default function StudentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="min-h-80 md:min-h-0 aspect-[3/4] md:aspect-auto relative">
          <Image
            src="/images/cornell_two.jpg"
            alt="Students surfing"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Start a Hack4Impact Chapter
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            Bring Hack4Impact to your campus. Found a chapter, build a team of
            student technologists, and create real software for nonprofits in
            your community.
          </p>
          <div className="mt-6">
            <Link href="#start">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Start a Chapter */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">
          Why start a chapter
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reasons.map((item) => (
            <Card
              key={item.title}
              icon={<Image src={item.icon} alt="" width={45} height={45} />}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <NumberedSteps
        heading="How to start a chapter"
        steps={steps}
        id="start"
      />

      {/* Existing Chapters */}
      <section className="px-8 md:px-12 py-16 md:py-24 bg-gray-50 text-center">
        <h2 className="text-2xl md:text-3xl font-sans mb-4">
          Looking to join an existing chapter?
        </h2>
        <p className="font-serif text-gray-600 mb-6">
          We have chapters at universities across the country. Find one near
          you.
        </p>
        <Link href="/chapters">
          <Button>Browse chapters</Button>
        </Link>
      </section>

      <FAQList items={faqs} />

      <CallToAction
        heading="Ready to start a chapter?"
        buttonText="Apply"
        href="mailto:contact@hack4impact.org"
        color="bg-green-100"
      />
    </>
  );
}
