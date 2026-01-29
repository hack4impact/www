"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
  wrapperClassName?: string;
  theadClassName?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  getRowHref,
  wrapperClassName,
  theadClassName,
}: DataTableProps<T>) {
  const router = useRouter();

  const handleRowClick = (row: T) => {
    if (getRowHref) {
      router.push(getRowHref(row));
    }
  };

  return (
    <div className={wrapperClassName}>
      <table className="w-full">
        <thead className={theadClassName}>
          <tr className="border-b border-gray-200 text-left">
            {columns.map((column) => (
              <th key={column.header} className={`py-4 px-4 font-sans font-medium ${column.headerClassName}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-gray-100 ${getRowHref ? "hover:bg-gray-50 cursor-pointer" : ""}`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.header} className={`py-4 px-4 ${column.className}`}>
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
