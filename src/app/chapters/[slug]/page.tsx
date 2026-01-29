import { notFound } from "next/navigation";
import { getChapterBySlug } from "@/data/chapters";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-br from-blue-100 to-green-200" />

      {/* Header */}
      <section className="p-8 md:px-24 md:py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-base font-serif mb-2">
            <span className="text-gray-600">{chapter.location}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">Est. {chapter.founded}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans">{chapter.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="p-8 md:px-24 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Description */}
          <p className="text-lg md:text-xl font-serif text-center mb-12">{chapter.description}</p>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-12">
            <div className="text-center">
              <p className="text-3xl font-sans">{chapter.memberCount}</p>
              <p className="text-sm text-gray-500 font-serif">Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-sans">{chapter.projectCount}</p>
              <p className="text-sm text-gray-500 font-serif">Projects</p>
            </div>
          </div>

          {/* Link Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.website && (
              <a
                href={chapter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 debug-border hover:bg-gray-50 transition-colors"
              >
                <p className="font-sans text-lg mb-1">Website</p>
                <p className="font-serif text-gray-500 text-sm truncate">{chapter.website}</p>
              </a>
            )}
            {chapter.github && (
              <a
                href={chapter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 debug-border hover:bg-gray-50 transition-colors"
              >
                <p className="font-sans text-lg mb-1">GitHub</p>
                <p className="font-serif text-gray-500 text-sm truncate">{chapter.github}</p>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
