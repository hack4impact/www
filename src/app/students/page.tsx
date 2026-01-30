import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CallToAction } from "@/components/ui/CallToAction";

const benefits = [
  {
    icon: "/icons/nonprofits.svg",
    title: "Real-World Experience",
    description:
      "Work on production software for real nonprofit clients — not classroom exercises. Ship code that makes a difference.",
  },
  {
    icon: "/icons/students.svg",
    title: "Community",
    description:
      "Join a network of mission-driven students across dozens of universities who share your passion for tech and social good.",
  },
  {
    icon: "/icons/professionals.svg",
    title: "Technical Growth",
    description:
      "Learn modern development practices, work in cross-functional teams, and receive mentorship from industry professionals.",
  },
];

const roles = [
  {
    title: "Developer",
    description:
      "Build features, write tests, and ship code using modern frameworks. Most teams use React, Next.js, or React Native.",
  },
  {
    title: "Designer",
    description:
      "Lead user research, create wireframes and prototypes, and ensure the final product is intuitive and accessible.",
  },
  {
    title: "Tech Lead",
    description:
      "Guide technical architecture, conduct code reviews, and mentor developers while keeping the project on track.",
  },
  {
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
  {
    question: "What if there's no chapter at my school?",
    answer:
      "You can start one! We provide a starter kit, mentorship from national leadership, and connections to other chapter founders to help you get up and running.",
  },
];

export default function StudentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="min-h-80 md:min-h-0 relative">
          <Image
            src="/images/gt.jpg"
            alt="Hack4Impact students"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Join Hack4Impact
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            Use your technical skills for social good. Work on real projects for nonprofit organizations, grow as a developer, and be part of a community that builds with purpose.
          </p>
          <div className="mt-6">
            <Link href="/chapters">
              <Button>Find your chapter</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">What you&apos;ll gain</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((item) => (
            <Card
              key={item.title}
              icon={<Image src={item.icon} alt="" width={45} height={45} />}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          Roles
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-gray-200">
          {roles.map((role) => (
            <div key={role.title} className="py-6">
              <h3 className="font-sans text-lg mb-1">{role.title}</h3>
              <p className="font-serif text-gray-600">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-8 lg:px-0 lg:pl-12 py-8 lg:py-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/gt_two.jpg"
              alt="Hack4Impact team"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <blockquote className="font-sans text-2xl md:text-3xl">
            &ldquo;Hack4Impact gave me the confidence to call myself a software engineer before I even graduated.&rdquo;
          </blockquote>
          <div className="mt-6 md:mt-8">
            <p className="font-sans text-lg">Former H4I Developer</p>
            <p className="font-serif text-gray-600">
              Now Software Engineer at Google
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          Common questions
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-gray-200">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-sans text-lg mb-2">{faq.question}</h3>
              <p className="font-serif text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CallToAction
        heading="No chapter at your school?"
        buttonText="Start one"
        href="mailto:contact@hack4impact.org"
        color="bg-green-100"
      />
    </>
  );
}
