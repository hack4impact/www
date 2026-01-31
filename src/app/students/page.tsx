import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SplitHero } from "@/components/ui/SplitHero";
import { CardGrid } from "@/components/ui/CardGrid";
import { NumberedSteps } from "@/components/ui/NumberedSteps";
import { FAQList } from "@/components/ui/FAQList";
import { CallToAction } from "@/components/ui/CallToAction";
import { getFAQs, getProcess } from "@/lib/contentful/api";
import { Suitcase, Heart, OpenBook } from "iconoir-react";

const iconProps = { width: 32, height: 32, strokeWidth: 1 } as const;

const reasons = [
  {
    icon: <Suitcase {...iconProps} />,
    title: "Leadership",
    description:
      "Build and lead a team of developers, designers, and project managers. Gain hands-on experience running a student organization from the ground up.",
  },
  {
    icon: <Heart {...iconProps} />,
    title: "Impact",
    description:
      "Connect your campus to local nonprofits and deliver real software that makes a difference in your community.",
  },
  {
    icon: <OpenBook {...iconProps} />,
    title: "Community",
    description:
      "Join a national network of chapter leaders who share resources, advice, and support across dozens of universities.",
  },
];

export default async function StudentsPage() {
  const [faqs, chapterProcess] = await Promise.all([
    getFAQs("Student Questions"),
    getProcess("Starting Chapter Process"),
  ]);

  return (
    <>
      <SplitHero
        heading="Start a Hack4Impact Chapter"
        description="Bring Hack4Impact to your campus. Found a chapter, build a team of student technologists, and create real software for nonprofits in your community."
        buttonText="Get started"
        buttonHref="#start"
        gradient="from-green-100 to-blue-200"
      />

      <CardGrid heading="Why start a chapter" items={reasons} />

      {chapterProcess && (
        <NumberedSteps
          heading={chapterProcess.title ?? "How to start a chapter"}
          steps={chapterProcess.steps}
          numbered={chapterProcess.numbered}
          id="start"
        />
      )}

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
