import { Button } from "@/components/ui/Button";

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

export default function AboutPage() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        {/* Image placeholder */}
        <div className="bg-gradient-to-br from-blue-100 to-green-300 min-h-64" />

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

      <section className="p-8 md:p-12">
        <h2 className="text-3xl font-sans text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center">
              {/* Placeholder icon */}
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
              <h3 className="text-xl font-sans mb-2">{value.title}</h3>
              <p className="text-base">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
