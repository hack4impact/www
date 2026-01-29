import Image from "next/image";
import { chapters } from "@/data/chapters";
import { ChaptersDataTable } from "@/components/ui/ChaptersDataTable";

export default function ChaptersPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 relative">
        <Image
          src="/images/umd.jpg"
          alt="University of Maryland campus"
          fill
          className="object-cover"
        />
      </section>

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Chapters</h1>
        <ChaptersDataTable chapters={chapters} />
      </section>
    </>
  );
}