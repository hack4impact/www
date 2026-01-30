import Link from "next/link";
import Image from "next/image";
import { journalEntries } from "@/data/journal-entries";
import { CallToAction } from "@/components/ui/CallToAction";

export default function JournalPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 relative">
        <Image src="/images/paper.jpg" alt="" fill className="object-cover" />
      </section>

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">
          Journal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalEntries.map((entry) => (
            <Link key={entry.id} href={`/journal/${entry.slug}`}>
              <article className="p-2">
                {/* Image placeholder */}
                <div className="aspect-[16/9] relative mb-4">
                  <Image
                    src={`/images/${entry.image}`}
                    alt={entry.alt!}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-xl font-sans mb-2">{entry.title}</h2>

                <div className="flex items-center gap-2 text-sm font-serif mb-2">
                  <span className="text-gray-600">{entry.tag}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600">{entry.readTime}</span>
                </div>

                <p className="text-base text-gray-700 font-serif">
                  {entry.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction
        heading="Have a story to share?"
        buttonText="Contact us"
        href="/about"
      />
    </>
  );
}
