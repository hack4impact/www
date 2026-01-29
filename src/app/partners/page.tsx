"use client";

import Link from "next/link";
import { partners, Partner } from "@/data/partners";
import { DataTable } from "@/components/ui/DataTable";

const columns: Array<{
  header: string;
  accessor: (row: Partner) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}> = [
  {
    header: "Partner",
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
    header: "Website",
    accessor: (row) =>
      row.website ? (
        <Link href={row.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {row.website.replace(/https?:\/\//, "")}
        </Link>
      ) : (
        ""
      ),
    className: "font-serif text-gray-600 hidden lg:table-cell",
    headerClassName: "hidden lg:table-cell",
  },
  {
    header: "Projects",
    accessor: (row) => row.projectCount,
    className: "font-sans text-gray-600 hidden lg:table-cell text-right",
    headerClassName: "hidden lg:table-cell text-right",
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Banner */}
      <section className="h-56 md:h-80 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100" />

      {/* Content */}
      <section className="p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-sans mb-12 text-center">Partners</h1>
        <DataTable
          columns={columns}
          data={partners}
          wrapperClassName="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded"
          theadClassName="sticky top-0 bg-white"
        />
      </section>
    </>
  );
}
