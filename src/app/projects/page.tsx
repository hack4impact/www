"use client";

import { projects, Project } from "@/data/projects";

import { DataTable } from "@/components/ui/DataTable";



const columns: Array<{



  id: string;



  header: string;



  accessor: (row: Project) => React.ReactNode;



  accessorKey?: keyof Project;



  width?: string;



  className?: string;



  headerClassName?: string;



}> = [



  {



    id: "title",



    header: "Project",



    accessorKey: "title",



    width: "30%",



    accessor: (row) => (



      <>



        <span className="font-sans text-base">{row.title}</span>



        <span className="block text-sm text-gray-500 font-serif md:hidden">{row.partner}</span>



      </>



    ),



  },



  {



    id: "partner",



    header: "Partner",



    accessorKey: "partner",



    width: "25%",



    accessor: (row) => row.partner,



    className: "font-serif text-gray-600 hidden md:table-cell",



    headerClassName: "hidden md:table-cell",



  },



  {



    id: "chapter",



    header: "Chapter",



    accessorKey: "chapter",



    width: "25%",



    accessor: (row) => row.chapter,



    className: "font-serif text-gray-600 hidden lg:table-cell",



    headerClassName: "hidden lg:table-cell",



  },



  {



    id: "tag",



    header: "Type",



    accessorKey: "tag",



    width: "10%",



    accessor: (row) => row.tag,



    className: "font-serif text-gray-600 hidden lg:table-cell",



    headerClassName: "hidden lg:table-cell",



  },



  {



    id: "year",



    header: "Year",



    accessorKey: "year",



    width: "10%",



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

          theadClassName="sticky top-0 bg-white border-b-2 border-gray-200"

          initialSort={{ columnId: "year", direction: "desc" }}

        />

      </section>

    </>

  );

}
