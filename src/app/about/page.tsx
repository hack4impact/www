import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const values = [
  {
    title: "Sustainable",
    description: "We build lasting solutions that continue to serve communities long after our initial engagement.",
  },
  {
    title: "Ethical",
    description: "We prioritize the needs and privacy of the communities we serve in every decision we make.",
  },
  {
    title: "Accessible",
    description: "We design inclusive software that works for everyone, regardless of ability or background.",
  },
];

function PlaceholderIcon() {
  return <div className="w-10 h-10 rounded-full bg-gray-200" />;
}

export default function AboutPage() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Image */}
        <div className="min-h-80 md:min-h-0 aspect-[3/4] md:aspect-auto relative">
          <Image
            src="/images/surf.jpg"
            alt="Students surfing"
            fill
            className="object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <h1 className="font-sans text-3xl md:text-4xl">
            Creating software to support those supporting their communities
          </h1>
          <div className="mt-6">
            <Button>Meet the Team</Button>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl font-sans mb-12 text-center">Our values</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card
              key={value.title}
              icon={<PlaceholderIcon />}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image placeholder - portrait */}
        <div className="px-8 lg:px-0 lg:pl-12 py-8 lg:py-12">
          <div className="bg-gradient-to-br from-purple-100 to-blue-300 aspect-[4/5] w-full" />
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center items-start p-8 lg:px-24 lg:py-12">
          <h2 className="font-sans text-3xl md:text-4xl">Our story</h2>
          <p className="mt-6 md:mt-8 text-base md:text-lg">
            Founded by students who believed technology could be a force for good, Hack4Impact began as a small group of developers volunteering their skills for local nonprofits. What started as weekend projects quickly grew into a nationwide network of chapters, each dedicated to bridging the gap between student talent and community needs. Today, we continue that mission, empowering the next generation of technologists to build with purpose and impact.
          </p>
        </div>
      </section>
    </>
  );
}
