import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Projects</h1>

        <div className="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-200 text-left">
                <th className="py-4 px-4 font-sans font-medium">Project</th>
                <th className="py-4 px-4 font-sans font-medium hidden md:table-cell">Partner</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell">Chapter</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell">Year</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell">Type</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="contents">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <td className="py-4 px-4">
                      <span className="font-sans text-base">{project.title}</span>
                      <span className="block text-sm text-gray-500 font-serif md:hidden">{project.partner}</span>
                    </td>
                    <td className="py-4 px-4 font-serif text-gray-600 hidden md:table-cell">{project.partner}</td>
                    <td className="py-4 px-4 font-serif text-gray-600 hidden lg:table-cell">{project.chapter}</td>
                    <td className="py-4 px-4 font-sans text-gray-600 hidden lg:table-cell">{project.year}</td>
                    <td className="py-4 px-4 font-serif text-gray-600 hidden lg:table-cell">{project.tag}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
