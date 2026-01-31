import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
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

const iconProps = { width: 64, height: 64, strokeWidth: 1 } as const;

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

const expectations = [
  {
    question: "How much time does it take?",
    answer:
      "A few hours per month. Most mentors join a weekly or biweekly check-in with their team and are available asynchronously for questions.",
  },
  {
    question: "Do I need to be local?",
    answer:
      "No. Mentorship is remote-friendly. You can work with a chapter anywhere in the country.",
  },
  {
    question: "What kind of background do I need?",
    answer:
      "Any professional experience in software engineering, product design, product management, or data science is valuable. You don't need to be a senior engineer — a few years of industry experience is plenty.",
  },
  {
    question: "How are mentors matched to teams?",
    answer:
      "We match based on your skills, interests, and availability. You'll be paired with a project team whose tech stack and domain align with your expertise.",
  },
];

export default function MentorsPage() {
  return (
    <>
      <SplitHero
        heading="Mentor with Hack4Impact"
        description="Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student&apos;s career and a nonprofit&apos;s future."
        buttonText="Get involved"
        buttonHref="#sign-up"
        gradient="from-purple-100 to-purple-200"
      />

      <CardGrid heading="What mentors do" items={contributions} />

      {/* Testimonials */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQList heading="What to expect" items={expectations} />

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
