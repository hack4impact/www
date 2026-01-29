import { notFound } from "next/navigation";
import Link from "next/link";
import { Separator } from "@base-ui/react/separator";
import { getChapterBySlug } from "@/data/chapters";
import { projects } from "@/data/projects";
import { ChapterProjects } from "@/components/ui/ChapterProjects";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  // Filter projects by this chapter
  const chapterProjects = projects.filter(
    (project) => project.chapter === chapter.name.replace("Hack4Impact ", "")
  );

  return (
    <>
      {/* Intro - Two column */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh]">
        {/* Image placeholder */}
        <div className="bg-gradient-to-br from-green-100 to-blue-200 min-h-64 md:min-h-0 aspect-[4/3] md:aspect-auto" />

        {/* Header content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <div className="flex items-center gap-2 text-base font-serif mb-2">
            <span className="text-gray-600">{chapter.location}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">Est. {chapter.founded}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans">{chapter.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="p-8 md:px-24 md:py-12">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/chapters" className="inline-flex items-center gap-2 font-sans text-gray-600 hover:text-gray-900">
            <span>←</span>
            <span>Back to chapters</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          {/* Sidebar - Stats */}
          <aside className="flex flex-row lg:flex-col gap-8 lg:gap-0 lg:border-r lg:pr-8 debug-border font-serif">
            <div className="lg:mb-6">
              <p className="text-sm text-gray-500">Members</p>
              <p className="text-2xl font-sans">{chapter.memberCount}</p>
            </div>
            <div className="lg:mb-6">
              <p className="text-sm text-gray-500">Projects</p>
              <p className="text-2xl font-sans">{chapter.projectCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">University</p>
              <p className="font-sans">{chapter.university}</p>
            </div>
          </aside>

          {/* Main content */}
          <article className="debug-border font-serif">
            {/* Description */}
            <p className="text-lg md:text-xl mb-8">{chapter.description}</p>

            {/* Divider */}
            <Separator className="border-t border-gray-300 mb-8" />

            {/* Link Cards */}
            {(chapter.website || chapter.github || chapter.instagram) && (
              <div className="flex flex-wrap gap-4 mb-8">
                {chapter.website && (
                  <a
                    href={chapter.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-sans text-base mb-1">Website</p>
                    <p className="font-serif text-gray-500 text-sm truncate">{chapter.website}</p>
                  </a>
                )}
                {chapter.github && (
                  <a
                    href={chapter.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-sans text-base mb-1">GitHub</p>
                    <p className="font-serif text-gray-500 text-sm truncate">{chapter.github}</p>
                  </a>
                )}
                {chapter.instagram && (
                  <a
                    href={chapter.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-sans text-base mb-1">Instagram</p>
                    <p className="font-serif text-gray-500 text-sm truncate">{chapter.instagram}</p>
                  </a>
                )}
              </div>
            )}

            {/* Projects Table */}
            {chapterProjects.length > 0 && (
              <>
                <Separator className="border-t border-gray-300 mb-8" />
                <h2 className="text-xl md:text-2xl font-sans mb-4">Projects</h2>
                <ChapterProjects projects={chapterProjects} />
              </>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
