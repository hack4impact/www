"use client";

import { projects, Project } from "@/data/projects";
import { DataTable } from "@/components/ui/DataTable";

const columns: Array<{
  header: string;
  accessor: (row: Project) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}> = [
  {
    header: "Project",
    accessor: (row) => (
      <>
        <span className="font-sans text-base">{row.title}</span>
        <span className="block text-sm text-gray-500 font-serif md:hidden">{row.partner}</span>
      </>
    ),
  },
  {
    header: "Partner",
    accessor: (row) => row.partner,
    className: "font-serif text-gray-600 hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    header: "Chapter",
    accessor: (row) => row.chapter,
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    header: "Type",
    accessor: (row) => row.tag,
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    header: "Year",
    accessor: (row) => row.year,
    className: "font-sans text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-purple-100 via-blue-100 to-green-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Projects</h1>
        <DataTable
          columns={columns}
          data={projects}
          getRowHref={(row) => `/projects/${row.slug}`}
          wrapperClassName="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded"
          theadClassName="sticky top-0 bg-white"
        />
      </section>
    </>
  );
}