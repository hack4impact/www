import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <section className="relative pb-32">
        {/* Gradient background */}
        <div className="absolute inset-0 bottom-1/4 bg-gradient-to-b from-white to-gray-200" />

        {/* Content */}
        <div className="relative text-center pt-24 px-8">
          <h1 className="flex flex-col gap-1 md:gap-2">
            <span className="font-serif text-4xl md:text-6xl">Code &amp; community</span>
            <span className="font-sans text-4xl md:text-6xl">for the common good</span>
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Committed to supporting nonprofits and social good initiatives, Hack for Impact educates and connects student volunteers, in search of real-world experience, with nonprofit partners that address crucial community needs.
          </p>
          <div className="mt-6">
            <Button>Partner with us!</Button>
          </div>
        </div>

        {/* Image hanging below gradient */}
        <div className="relative mt-8 flex justify-center px-8">
          <div className="debug-border">
            <Image
              src="/gt.jpg"
              alt="Hack4Impact"
              width={800}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
