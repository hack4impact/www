"use client";

import { chapters, Chapter } from "@/data/chapters";
import { DataTable } from "@/components/ui/DataTable";

const columns: Array<{
  id: string;
  header: string;
  accessor: (row: Chapter) => React.ReactNode;
  accessorKey?: keyof Chapter;
  width?: string;
  className?: string;
  headerClassName?: string;
}> = [
  {
    id: "name",
    header: "Chapter",
    accessorKey: "name",
    width: "40%",
    accessor: (row) => (
      <>
        <span className="font-sans text-base">{row.name}</span>
        <span className="block text-sm text-gray-500 font-serif md:hidden">{row.location}</span>
      </>
    ),
  },
  {
    id: "location",
    header: "Location",
    accessorKey: "location",
    width: "25%",
    accessor: (row) => row.location,
    className: "font-serif text-gray-600 hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    id: "founded",
    header: "Founded",
    accessorKey: "founded",
    width: "15%",
    accessor: (row) => row.founded,
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    id: "memberCount",
    header: "Members",
    accessorKey: "memberCount",
    width: "10%",
    accessor: (row) => row.memberCount,
    className: "font-sans text-gray-600 hidden lg:table-cell text-right",
    headerClassName: "hidden lg:table-cell text-right",
  },
  {
    id: "projectCount",
    header: "Projects",
    accessorKey: "projectCount",
    width: "10%",
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
          theadClassName="sticky top-0 bg-white border-b-2 border-gray-200"
          initialSort={{ columnId: "name", direction: "asc" }}
        />
      </section>
    </>
  );
}