"use client";

import { DataTable, type Column } from "@/components/ui/DataTable";
import type { Project } from "@/lib/types/project";

const projectColumns: Column<Project>[] = [
  {
    id: "title",
    header: "Project",
    accessorKey: "title",
    width: "40%",
    accessor: (row) => (
      <>
        <span className="font-sans text-sm">{row.title}</span>
        <span className="block text-xs text-gray-500 font-serif md:hidden">{row.partner}</span>
      </>
    ),
  },
  {
    id: "partner",
    header: "Partner",
    accessorKey: "partner",
    width: "30%",
    accessor: (row) => row.partner,
    className: "font-serif text-gray-600 text-sm hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    id: "tag",
    header: "Type",
    accessorKey: "tag",
    width: "15%",
    accessor: (row) => row.tag,
    className: "font-serif text-gray-600 text-sm hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    id: "year",
    header: "Year",
    accessorKey: "year",
    width: "15%",
    accessor: (row) => row.year,
    className: "font-sans text-gray-600 text-sm hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
];

interface ChapterProjectsProps {
  projects: Project[];
}

export function ChapterProjects({ projects }: ChapterProjectsProps) {
  return (
    <DataTable
      columns={projectColumns}
      data={projects}
      getRowHref={(row) => `/projects/${row.slug}`}
      wrapperClassName="overflow-auto max-h-[50vh] rounded"
      theadClassName="sticky top-0 bg-gray-50"
      initialSort={{ columnId: "year", direction: "desc" }}
    />
  );
}
