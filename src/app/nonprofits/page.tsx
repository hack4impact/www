import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NumberedSteps } from "@/components/ui/NumberedSteps";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

const testimonials = [
  {
    quote:
      "Working with Hack4Impact gave us a tool that fundamentally changed how we serve our community.",
    name: "Javid Fathi",
    title: "Software Engineer Lead at Microsoft",
  },
  {
    quote:
      "The students delivered a product that exceeded our expectations — and they did it with genuine care for our mission.",
    name: "Sarah Chen",
    title: "Executive Director, Community Aid Network",
  },
  {
    quote:
      "We went from spreadsheets to a custom platform in one semester. Our volunteers save hours every week.",
    name: "Marcus Johnson",
    title: "Operations Manager, Youth Forward",
  },
];

const buildTypes = [
  {
    icon: "/icons/nonprofits.svg",
    title: "Web Applications",
    description:
      "Full-stack web apps tailored to your workflows — dashboards, portals, intake systems, and more.",
  },
  {
    icon: "/icons/students.svg",
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications that put your services directly in the hands of the people you serve.",
  },
  {
    icon: "/icons/professionals.svg",
    title: "Data Dashboards",
    description:
      "Interactive visualizations and reporting tools that help you measure outcomes and tell your story with data.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit a brief application describing your organization and the challenge you're facing. We review applications on a rolling basis.",
  },
  {
    number: "02",
    title: "Scope",
    description:
      "Our team meets with you to understand your goals, users, and constraints. Together we define the project scope and success criteria.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create wireframes and prototypes in close collaboration with your team, iterating on feedback until the solution fits your needs.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "A student team develops your product over the course of a semester, with regular check-ins to keep you informed and involved.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "We hand off the finished product with documentation and training so your team can manage it independently going forward.",
  },
];

const faqs = [
  {
    question: "How much does it cost?",
    answer:
      "Nothing. Hack4Impact provides its services pro bono. Our student developers volunteer their time as part of a service-learning experience.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most projects run for one academic semester (about 12–14 weeks). Larger projects may span two semesters.",
  },
  {
    question: "What is the time commitment for our team?",
    answer:
      "We ask for a point of contact who can meet with us for about an hour each week to provide feedback and answer questions.",
  },
  {
    question: "Who owns the finished product?",
    answer:
      "You do. All code and assets are transferred to your organization at the end of the project.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our stack varies by project needs, but we commonly use React, Next.js, Node.js, Python, and PostgreSQL. We choose whatever best fits your requirements.",
  },
];

export default function NonprofitsPage() {
  return (
    <>
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="min-h-80 md:min-h-0 bg-gradient-to-br from-blue-100 to-blue-200" />
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Partner with Hack4Impact
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            We build custom software for nonprofits — free of charge. Our student teams turn your technical challenges into lasting solutions that amplify your impact.
          </p>
          <div className="mt-6">
            <Link href="#apply">
              <Button>Apply now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">What we build</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {buildTypes.map((item) => (
            <Card
              key={item.title}
              icon={<Image src={item.icon} alt="" width={45} height={45} />}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <NumberedSteps heading="How it works" steps={processSteps} />

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQList heading="What to expect" items={faqs} />

      {/* Apply CTA */}
      <CallToAction
        id="apply"
        heading="Ready to get started?"
        buttonText="Apply now"
        href="mailto:contact@hack4impact.org"
      />
    </>
  );
}
