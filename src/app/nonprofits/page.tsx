import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CallToAction } from "@/components/ui/CallToAction";

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
        <div className="min-h-80 md:min-h-0 relative">
          <Image
            src="/images/group.jpg"
            alt="Students collaborating on a project"
            fill
            className="object-cover"
          />
        </div>
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

      {/* How It Works */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          How it works
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col divide-y divide-gray-200 border-t border-gray-200">
            {processSteps.map((step) => (
              <div key={step.number} className="py-6 relative">
                <span className="absolute top-6 right-0 font-mono text-gray-400">
                  {step.number}
                </span>
                <h3 className="text-lg font-sans mb-1">{step.title}</h3>
                <p className="font-serif text-gray-600 pr-12">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-8 lg:px-0 lg:pl-12 py-8 lg:py-12">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/javid.jpg"
              alt="Javid Fathi"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <blockquote className="font-sans text-2xl md:text-3xl">
            &ldquo;Working with Hack4Impact gave us a tool that fundamentally changed how we serve our community.&rdquo;
          </blockquote>
          <div className="mt-6 md:mt-8">
            <p className="font-sans text-lg">Javid Fathi</p>
            <p className="font-serif text-gray-600">
              Software Engineer Lead at Microsoft
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          What to expect
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
