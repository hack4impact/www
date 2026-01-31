import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { NumberedSteps } from "@/components/ui/NumberedSteps";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { getFAQs } from "@/lib/contentful/api";
import { Heart, OpenBook, Suitcase } from "iconoir-react";

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

const iconProps = { width: 64, height: 64, strokeWidth: 1 } as const;

const buildTypes = [
  {
    icon: <Heart {...iconProps} />,
    title: "Web Applications",
    description:
      "Full-stack web apps tailored to your workflows — dashboards, portals, intake systems, and more.",
  },
  {
    icon: <OpenBook {...iconProps} />,
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications that put your services directly in the hands of the people you serve.",
  },
  {
    icon: <Suitcase {...iconProps} />,
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

export default async function NonprofitsPage() {
  const faqs = await getFAQs("Nonprofit Questions");

  return (
    <>
      <SplitHero
        heading="Partner with Hack4Impact"
        description="We build custom software for nonprofits — free of charge. Our student teams turn your technical challenges into lasting solutions that amplify your impact."
        buttonText="Apply now"
        buttonHref="#apply"
        gradient="from-blue-100 to-blue-200"
      />

      <CardGrid heading="What we build" items={buildTypes} />

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
