import { notFound } from "next/navigation";
import { Separator } from "@base-ui/react/separator";
import { getJournalEntryBySlug } from "@/data/journal-entries";

interface JournalPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="p-8 md:px-24 md:py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-base font-serif mb-2">
            <span className="text-gray-600">{entry.tag}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">{entry.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans">{entry.title}</h1>
        </div>
      </section>

      {/* Banner image placeholder */}
      <section className="px-8 md:px-12">
        <div className="w-full aspect-[3/1] bg-gradient-to-br from-blue-100 to-green-200" />
      </section>

      {/* Content */}
      <section className="p-8 md:px-24 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          {/* Sidebar - Author & Date */}
          <aside className="grid grid-cols-2 lg:block lg:border-r lg:pr-8 debug-border font-serif">
            <div className="mb-0 lg:mb-4">
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-sans">{entry.author}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Published</p>
              <p className="font-sans">{entry.publishedDate}</p>
            </div>
          </aside>

          {/* Article content */}
          <article className="debug-border font-serif">
            {/* Intro */}
            <p className="text-lg md:text-xl mb-6">{entry.intro}</p>

            {/* Divider */}
            <Separator className="border-t border-gray-300 mb-6" />

            {/* Content */}
            <div className="max-w-none">
              {entry.content.split("\n\n").map((block, index) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-xl md:text-2xl font-sans mt-8 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                return (
                  <p key={index} className="mb-4 text-base md:text-lg">
                    {block}
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
