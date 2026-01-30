import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";

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

const contributions = [
  {
    icon: "/icons/professionals.svg",
    title: "Code Review",
    description:
      "Review pull requests and provide feedback on architecture, code quality, and best practices.",
  },
  {
    icon: "/icons/students.svg",
    title: "Career Guidance",
    description:
      "Share your experience navigating the tech industry and help students prepare for internships and full-time roles.",
  },
  {
    icon: "/icons/nonprofits.svg",
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
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="min-h-80 md:min-h-0 bg-gradient-to-br from-purple-100 to-purple-200" />
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Mentor with Hack4Impact
          </h1>
          <p className="mt-4 text-base md:text-lg font-serif text-gray-600">
            Share your industry experience with the next generation of socially-conscious technologists. A few hours a month can shape a student&apos;s career and a nonprofit&apos;s future.
          </p>
          <div className="mt-6">
            <Link href="#sign-up">
              <Button>Get involved</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Mentors Do */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">What mentors do</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {contributions.map((item) => (
            <Card
              key={item.title}
              icon={<Image src={item.icon} alt="" width={45} height={45} />}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

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
