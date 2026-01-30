import Link from "next/link";
import { journalEntries } from "@/data/journal-entries";
import { CallToAction } from "@/components/ui/CallToAction";

const thumbnailGradients = [
  "from-orange-100 to-pink-200",
  "from-purple-100 to-blue-200",
  "from-green-100 to-teal-200",
  "from-blue-100 to-indigo-200",
];

export default function JournalPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">
          Journal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalEntries.map((entry, i) => (
            <Link key={entry.id} href={`/journal/${entry.slug}`}>
              <article className="p-2">
                <div className={`aspect-[16/9] mb-4 bg-gradient-to-br ${thumbnailGradients[i % thumbnailGradients.length]}`} />

                <h2 className="text-xl font-sans mb-2">{entry.title}</h2>

                <div className="flex items-center gap-2 text-sm font-serif mb-2">
                  <span className="text-gray-600">{entry.tag}</span>
                  <span className="text-gray-400">&middot;</span>
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
