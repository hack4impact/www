"use client";

import Link from "next/link";
import { DataTable } from "@/components/ui/DataTable";
import type { Partner } from "@/data/partners";

const columns: Array<{
  id: string;
  header: string;
  accessor: (row: Partner) => React.ReactNode;
  accessorKey?: keyof Partner;
  width?: string;
  className?: string;
  headerClassName?: string;
}> = [
  {
    id: "name",
    header: "Partner",
    accessorKey: "name",
    width: "30%",
    accessor: (row) => (
      <>
        <span className="font-sans text-base">{row.name}</span>
        <span className="block text-sm text-gray-500 font-serif md:hidden">
          {row.organizationTypes?.join(", ")}
        </span>
      </>
    ),
  },
  {
    id: "organizationTypes",
    header: "Type",
    width: "20%",
    accessor: (row) => row.organizationTypes?.join(", ") ?? "",
    className: "font-serif text-gray-600 hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
  {
    id: "subjects",
    header: "Subject",
    width: "20%",
    accessor: (row) => row.subjects?.join(", ") ?? "",
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    id: "populations",
    header: "Population",
    width: "15%",
    accessor: (row) => row.populations?.join(", ") ?? "",
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    id: "website",
    header: "",
    width: "10%",
    accessor: (row) =>
      row.website ? (
        <Link
          href={row.website}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-gray-600 hover:text-gray-900 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Visit &rarr;
        </Link>
      ) : null,
    className: "text-right hidden md:table-cell",
    headerClassName: "hidden md:table-cell",
  },
];

interface PartnersDataTableProps {
  partners: Partner[];
}

export function PartnersDataTable({ partners }: PartnersDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={partners}
      wrapperClassName="overflow-auto max-h-[70vh] bg-[#FCF9F2]/80 backdrop-blur-sm rounded"
      theadClassName="sticky top-0 bg-[#FCF9F2] border-b-2 border-gray-200"
      initialSort={{ columnId: "name", direction: "asc" }}
    />
  );
}
