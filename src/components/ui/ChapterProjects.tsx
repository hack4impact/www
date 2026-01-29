"use client";

import { DataTable } from "@/components/ui/DataTable";
import type { Project } from "@/data/projects";

const projectColumns: Array<{
  header: string;
  accessor: (row: Project) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}> = [
  {
    header: "Project",
    accessor: (row) => (
      <>
        <span className="font-sans text-sm">{row.title}</span>
        <span className="block text-xs text-gray-500 font-serif md:hidden">{row.partner}</span>
      </>
    ),
  },
  {
    header: "Partner",
    accessor: (row) => row.partner,
    className: "font-serif text-gray-600 text-sm hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    header: "Type",
    accessor: (row) => row.tag,
    className: "font-serif text-gray-600 text-sm hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    header: "Year",
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
      wrapperClassName="overflow-auto debug-border rounded"
      theadClassName="bg-gray-50"
    />
  );
}
