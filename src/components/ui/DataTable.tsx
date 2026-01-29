import React from "react";
import Link from "next/link";

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowHref?: (row: T) => string;
}

export function DataTable<T extends { id: string | number }>({ columns, data, getRowHref }: DataTableProps<T>) {
  return (
    <div className="overflow-auto max-h-[70vh] debug-border bg-white/80 backdrop-blur-sm rounded">
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-gray-200 text-left">
            {columns.map((column) => (
              <th key={column.header} className={`py-4 px-4 font-sans font-medium ${column.headerClassName}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const rowContent = (
              <tr
                key={row.id}
                className={`border-b border-gray-100 ${getRowHref ? "hover:bg-gray-50 cursor-pointer" : ""}`}
              >
                {columns.map((column) => (
                  <td key={column.header} className={`py-4 px-4 ${column.className}`}>
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            );

            if (getRowHref) {
              return (
                <Link key={row.id} href={getRowHref(row)} className="contents">
                  {rowContent}
                </Link>
              );
            }

            return rowContent;
          })}
        </tbody>
      </table>
    </div>
  );
}
