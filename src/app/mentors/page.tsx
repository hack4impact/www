import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CallToAction } from "@/components/ui/CallToAction";

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
        <div className="min-h-80 md:min-h-0 relative">
          <Image
            src="/images/surf.jpg"
            alt="Hack4Impact community"
            fill
            className="object-cover"
          />
        </div>
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
            &ldquo;Mentoring at Hack4Impact reminded me why I got into engineering in the first place — to help people.&rdquo;
          </blockquote>
          <div className="mt-6 md:mt-8">
            <p className="font-sans text-lg">Javid Fathi</p>
            <p className="font-serif text-gray-600">
              Software Engineer Lead at Microsoft
            </p>
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-sans mb-8 md:mb-12 text-center">
          What to expect
        </h2>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-t border-gray-200">
          {expectations.map((item) => (
            <div key={item.question} className="py-6">
              <h3 className="font-sans text-lg mb-2">{item.question}</h3>
              <p className="font-serif text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

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
