import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { getFAQs } from "@/lib/contentful/api";
import { Suitcase, OpenBook, Heart } from "iconoir-react";

const testimonials = [
  {
    quote:
      "Mentoring at Hack4Impact reminded me why I got into engineering in the first place — to help people.",
    name: "Javid Fathi",
    title: "Software Engineer Lead at Microsoft",
  },
  {
    quote:
      "Watching students grow from nervous beginners to confident engineers over one semester is incredibly rewarding.",
    name: "Priya Patel",
    title: "Senior Engineer at Stripe",
  },
  {
    quote:
      "The teams are sharp, motivated, and building things that matter. It's the most meaningful volunteer work I've done.",
    name: "David Kim",
    title: "Staff Engineer at Meta",
  },
];

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const;

const contributions = [
  {
    icon: <Suitcase {...iconProps} />,
    title: "Code Review",
    description:
      "Review pull requests and provide feedback on architecture, code quality, and best practices.",
  },
  {
    icon: <OpenBook {...iconProps} />,
    title: "Career Guidance",
    description:
      "Share your experience navigating the tech industry and help students prepare for internships and full-time roles.",
  },
  {
    icon: <Heart {...iconProps} />,
    title: "Project Advice",
    description:
      "Help teams make smart technical decisions, unblock tricky problems, and scope their work realistically.",
  },
];

export default async function MentorsPage() {
  const faqs = await getFAQs("Mentor Questions");

  return (
    <>
      <SplitHero
        heading="Mentor with Hack4Impact"
        description="Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student's career and a nonprofit's future."
        buttonText="Get involved"
        buttonHref="#sign-up"
        gradient="from-purple-100 to-purple-200"
      />

      <CardGrid heading="What mentors do" items={contributions} />

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQList heading="What to expect" items={faqs} />

      {/* Sign Up CTA */}
      <CallToAction
        id="sign-up"
        heading="Ready to mentor?"
        buttonText="Sign up"
        href="mailto:contact@hack4impact.org"
        color="bg-purple-100"
      />
    </>
  );
}
