"use client";

import Link from "next/link";
import { partners, Partner } from "@/data/partners";
import { DataTable } from "@/components/ui/DataTable";
import { PageIntro } from "@/components/ui/PageIntro";

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
    id: "website",
    header: "Website",
    accessorKey: "website",
    width: "35%",
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
    id: "projectCount",
    header: "Projects",
    accessorKey: "projectCount",
    width: "10%",
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

      <PageIntro
        heading="Partners"
        description="We work with nonprofit organizations across the country to build software that strengthens their missions. Here are the partners we've had the privilege of serving."
      />

      {/* Data Table */}
      <section className="p-8 md:p-12">
        <DataTable
          columns={columns}
          data={partners}
          wrapperClassName="overflow-auto max-h-[70vh] bg-[#FCF9F2]/80 backdrop-blur-sm rounded"
          theadClassName="sticky top-0 bg-[#FCF9F2] border-b-2 border-gray-200"
          initialSort={{ columnId: "name", direction: "asc" }}
        />
      </section>
    </>
  );
}
