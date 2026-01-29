import Link from "next/link";
import { chapters } from "@/data/chapters";

export default function ChaptersPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Chapters</h1>

        <div className="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-gray-200 text-left">
                <th className="py-4 px-4 font-sans font-medium">Chapter</th>
                <th className="py-4 px-4 font-sans font-medium hidden md:table-cell">Location</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell">Founded</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell text-right">Members</th>
                <th className="py-4 px-4 font-sans font-medium hidden lg:table-cell text-right">Projects</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={`/chapters/${chapter.slug}`} className="contents">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <td className="py-4 px-4">
                      <span className="font-sans text-base">{chapter.name}</span>
                      <span className="block text-sm text-gray-500 font-serif md:hidden">{chapter.location}</span>
                    </td>
                    <td className="py-4 px-4 font-serif text-gray-600 hidden md:table-cell">{chapter.location}</td>
                    <td className="py-4 px-4 font-serif text-gray-600 hidden lg:table-cell">{chapter.founded}</td>
                    <td className="py-4 px-4 font-sans text-gray-600 hidden lg:table-cell text-right">{chapter.memberCount}</td>
                    <td className="py-4 px-4 font-sans text-gray-600 hidden lg:table-cell text-right">{chapter.projectCount}</td>
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
