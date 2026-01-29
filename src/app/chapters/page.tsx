"use client";

import { chapters, Chapter } from "@/data/chapters";
import { DataTable } from "@/components/ui/DataTable";

const columns: Array<{
  header: string;
  accessor: (row: Chapter) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}> = [
  {
    header: "Chapter",
    accessor: (row) => (
      <>
        <span className="font-sans text-base">{row.name}</span>
        <span className="block text-sm text-gray-500 font-serif md:hidden">{row.location}</span>
      </>
    ),
  },
  {
    header: "Location",
    accessor: (row) => row.location,
    className: "font-serif text-gray-600 hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    header: "Founded",
    accessor: (row) => row.founded,
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    header: "Members",
    accessor: (row) => row.memberCount,
    className: "font-sans text-gray-600 hidden lg:table-cell text-right",
    headerClassName: "hidden lg:table-cell text-right",
  },
  {
    header: "Projects",
    accessor: (row) => row.projectCount,
    className: "font-sans text-gray-600 hidden lg:table-cell text-right",
    headerClassName: "hidden lg:table-cell text-right",
  },
];

export default function ChaptersPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Chapters</h1>
        <DataTable
          columns={columns}
          data={chapters}
          getRowHref={(row) => `/chapters/${row.slug}`}
          wrapperClassName="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded"
          theadClassName="sticky top-0 bg-white"
        />
      </section>
    </>
  );
}