"use client";

import { DataTable, type Column } from "@/components/ui/DataTable";
import type { Chapter } from "@/lib/types/chapter";

const columns: Column<Chapter>[] = [
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

interface ChaptersDataTableProps {
  chapters: Chapter[];
}

export function ChaptersDataTable({ chapters }: ChaptersDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={chapters}
      getRowHref={(row) => `/chapters/${row.slug}`}
      wrapperClassName="overflow-auto max-h-[70vh] bg-white/80 backdrop-blur-sm rounded"
      theadClassName="sticky top-0 bg-white border-b-2 border-gray-200"
      initialSort={{ columnId: "name", direction: "asc" }}
    />
  );
}
