import { notFound } from "next/navigation";
import Link from "next/link";
import { Separator } from "@base-ui/react/separator";
import { getChapterBySlug, getProjects } from "@/lib/notion/api";
import { ChapterProjects } from "@/components/ui/ChapterProjects";
import { LinkCard } from "@/components/ui/LinkCard";
import { getAssetUrl } from "@/lib/contentful";
import Image from "next/image";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const [chapter, chapterImage] = await Promise.all([
    getChapterBySlug(slug),
    getAssetUrl(slug),
  ]);

  if (!chapter) {
    notFound();
  }

  // Filter projects by this chapter
  const allProjects = await getProjects();
  const chapterProjects = allProjects.filter(
    (project) => project.chapter === chapter.name.replace("Hack4Impact ", ""),
  );

  return (
    <>
      {/* Intro - Two column */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh]">
        <div className="bg-gradient-to-br relative from-green-100 to-blue-200 min-h-64 md:min-h-0 aspect-[4/3] md:aspect-auto">
          {chapterImage && (
            <Image
              fill
              className="object-cover"
              src={chapterImage}
              alt={`An image of ${chapter.name}'s student volunteers`}
            />
          )}
        </div>

        {/* Header content */}
        <div className="flex flex-col justify-center items-start p-8 md:p-12 bg-[#FCF9F2]">
          <div className="flex items-center gap-2 text-base font-serif mb-2">
            <span className="text-gray-600">{chapter.location}</span>
            {chapter.location && chapter.founded && (
              <span className="text-gray-400">·</span>
            )}
            {chapter.founded && (
              <span className="text-gray-600">Est. {chapter.founded}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-sans max-w-lg">
            {chapter.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="p-8 md:px-24 md:py-12">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/chapters"
            className="inline-flex items-center gap-2 font-sans text-gray-600 hover:text-gray-900"
          >
            <span>←</span>
            <span>Back to chapters</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
          {/* Sidebar - Stats */}
          <aside className="flex flex-row lg:flex-col gap-8 lg:gap-0 lg:pr-8 font-serif">
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
          <article className="font-serif">
            {/* Description */}
            <p className="text-lg md:text-xl mb-8">{chapter.description}</p>

            {/* Divider */}
            <Separator className="border-t border-gray-300 mb-8" />

            {/* Link Cards */}
            {(chapter.website || chapter.github || chapter.instagram) && (
              <div className="flex flex-wrap gap-4 mb-8">
                {chapter.website && (
                  <LinkCard
                    label="Website"
                    href={chapter.website}
                    className="flex-1"
                  />
                )}
                {chapter.github && (
                  <LinkCard
                    label="GitHub"
                    href={chapter.github}
                    className="flex-1"
                  />
                )}
                {chapter.instagram && (
                  <LinkCard
                    label="Instagram"
                    href={chapter.instagram}
                    className="flex-1"
                  />
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
