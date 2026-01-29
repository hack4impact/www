"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Column<T> {
  id: string; // Unique identifier for the column
  header: string;
  accessor: (row: T) => React.ReactNode;
  accessorKey?: keyof T; // For sorting raw values
  width?: string; // Optional width for the column
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowHref?: (row: T) => string;
  wrapperClassName?: string;
  theadClassName?: string;
  initialSort?: {
    columnId: string;
    direction: "asc" | "desc";
  };
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  getRowHref,
  wrapperClassName,
  theadClassName,
  initialSort,
}: DataTableProps<T>) {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState(initialSort);

  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig) {
      const { columnId, direction } = sortConfig;
      const sortColumn = columns.find((c) => c.id === columnId);
      const accessorKey = sortColumn?.accessorKey;

                if (accessorKey) {
                  sortableData.sort((a, b) => {
                    const aValue = String(a[accessorKey] ?? "").toLowerCase();
                    const bValue = String(b[accessorKey] ?? "").toLowerCase();
      
                    if (aValue < bValue) {
                      return direction === "asc" ? -1 : 1;
                    }
                    if (aValue > bValue) {
                      return direction === "asc" ? 1 : -1;
                    }
                    return 0;
                  });
                }    }
    return sortableData;
  }, [data, sortConfig, columns]);

  const handleRowClick = (row: T) => {
    if (getRowHref) {
      router.push(getRowHref(row));
    }
  };

  const handleSort = (columnId: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.columnId === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ columnId, direction });
  };

  const getSortIndicator = (columnId: string) => {
    if (!sortConfig || sortConfig.columnId !== columnId) {
      return null;
    }
    if (sortConfig.direction === "asc") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="inline-block ml-1">
          <path fill="currentColor" d="m7 14l5-5l5 5z" />
        </svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="inline-block ml-1">
        <path fill="currentColor" d="m7 10l5 5l5-5z" />
      </svg>
    );
  };

  return (
    <div className={wrapperClassName}>
      <table className="w-full">
        <thead className={theadClassName}>
          <tr className="border-b border-gray-200 text-left">
            {columns.map((column) => (
              <th
                key={column.id}
                style={{ width: column.width }}
                className={`py-4 px-4 font-sans font-medium cursor-pointer ${column.headerClassName}`}
                onClick={() => column.accessorKey && handleSort(column.id)}
              >
                <div className="flex items-center">
                  {column.header}
                  {getSortIndicator(column.id)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-gray-100 ${getRowHref ? "hover:bg-gray-50 cursor-pointer" : ""}`}
              onClick={() => handleRowClick(row)}
            >
              {columns.map((column) => (
                <td key={column.id} className={`py-4 px-4 ${column.className}`}>
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
