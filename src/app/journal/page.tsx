import { journalEntries } from "@/data/journal-entries";

export default function JournalPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-48 md:h-64 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12">Journal</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalEntries.map((entry) => (
            <article key={entry.id} className="debug-border">
              {/* Image placeholder */}
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 mb-4" />

              <h2 className="text-xl font-sans mb-2">{entry.title}</h2>

              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-gray-600">{entry.tag}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">{entry.readTime}</span>
              </div>

              <p className="text-base text-gray-700">{entry.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
