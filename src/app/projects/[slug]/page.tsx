import { notFound } from "next/navigation";
import Link from "next/link";
import { Separator } from "@base-ui/react/separator";
import { getProjectBySlug } from "@/lib/services/notion";
import { LinkCard } from "@/components/ui/LinkCard";
import type { TeamMember, ProjectSection } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function SectionRenderer({ section }: { section: ProjectSection }) {
  switch (section.type) {
    case "text":
      return (
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-sans mt-8 mb-4">{section.title}</h2>
          <p className="text-base md:text-lg">{section.content}</p>
        </div>
      );

    case "image":
      return (
        <figure className="mb-8">
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200" />
          {section.caption && (
            <figcaption className="text-sm text-gray-500 font-serif mt-2">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );

    case "two-column":
      return (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ${
            section.imagePosition === "right" ? "" : "md:[&>*:first-child]:order-2"
          }`}
        >
          <div className="flex items-center">
            <p className="text-base md:text-lg">{section.text}</p>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200" />
        </div>
      );

    case "image-grid":
      return (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {section.images.map((_, index) => (
            <div key={index} className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200" />
          ))}
        </div>
      );

    default:
      return null;
  }
}

function groupTeamByRole(team: TeamMember[]) {
  const roles = ["Tech Lead", "Project Manager", "Designer", "Developer"] as const;
  const grouped: Record<string, string[]> = {};

  for (const role of roles) {
    const members = team.filter((m) => m.role === role).map((m) => m.name);
    if (members.length > 0) {
      // Pluralize role names for multiple members
      const roleLabel =
        members.length > 1 && role === "Developer"
          ? "Developers"
          : members.length > 1 && role === "Designer"
            ? "Designers"
            : members.length > 1 && role === "Project Manager"
              ? "Project Managers"
              : role;
      grouped[roleLabel] = members;
    }
  }

  return grouped;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const teamByRole = groupTeamByRole(project.team);

  return (
    <>
      {/* Header */}
      <section className="p-8 md:px-24 md:py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-base font-serif mb-2">
            <span className="text-gray-600">{project.tag}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">{project.chapter}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">{project.year}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans">{project.title}</h1>
        </div>
      </section>

      {/* Banner image placeholder */}
      <section className="px-8 md:px-12">
        <div className="w-full aspect-[3/1] bg-gradient-to-br from-purple-100 to-blue-200" />
      </section>

      {/* Content */}
      <section className="p-8 md:px-24 md:py-12">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center gap-2 font-sans text-gray-600 hover:text-gray-900">
            <span>←</span>
            <span>Back to projects</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-24">
          {/* Sidebar - Project Details */}
          <aside className="grid grid-cols-2 lg:block lg:pr-8 font-serif">
            <div className="mb-4 lg:mb-6">
              <p className="text-sm text-gray-500">Partner</p>
              <p className="font-sans">{project.partner}</p>
            </div>
            <div className="mb-4 lg:mb-6">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-sans">{project.duration}</p>
            </div>
            {project.technologies && (
              <div className="col-span-2 lg:col-span-1 mb-4 lg:mb-6">
                <p className="text-sm text-gray-500 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2 py-1 text-sm font-sans bg-gray-100 text-gray-700 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Article content */}
          <article className="font-serif">
            {/* Intro */}
            <p className="text-lg md:text-xl mb-6">{project.intro}</p>

            {/* Links */}
            {(project.website || project.github) && (
              <div className={`grid gap-4 mb-6 ${project.website && project.github ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {project.website && (
                  <LinkCard label="Website" href={project.website} />
                )}
                {project.github && (
                  <LinkCard label="GitHub" href={project.github} />
                )}
              </div>
            )}

            {/* Divider */}
            <Separator className="border-t border-gray-300 mb-6" />

            {/* Sections */}
            {project.sections.length > 0 && (
              <div className="max-w-none">
                {project.sections.map((section, index) => (
                  <SectionRenderer key={index} section={section} />
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      {/* Team Section */}
      <section className="p-8 md:px-24 md:py-12 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-sans mb-8">Team</h2>
        {(() => {
          const roleCount = Object.keys(teamByRole).length;
          const gridCols = roleCount === 1 ? "grid-cols-1"
            : roleCount === 2 ? "grid-cols-1 md:grid-cols-2"
            : roleCount === 3 ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
          return (
            <div className={`grid ${gridCols} gap-8`}>
              {Object.entries(teamByRole).map(([role, members]) => (
                <div key={role}>
                  <p className="text-sm text-gray-500 font-serif mb-2">{role}</p>
                  <ul className="space-y-1">
                    {members.map((name) => (
                      <li key={name} className="font-sans">{name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })()}
      </section>

    </>
  );
}
