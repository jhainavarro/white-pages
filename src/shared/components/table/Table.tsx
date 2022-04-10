import React from "react";
import { Column, Row, TableRowProps, useTable } from "react-table";
import { Table as MTable } from "@mantine/core";

interface TableProps<D extends object> {
  columns: Column<D>[];
  data: D[];

  // For customizing the table props. Add more as needed (eg, for columns, headers, etc)
  getRowProps?: (row: Row<D>) => Omit<TableRowProps, "key">;
  onRowClick?: (data: D) => void;
}

export function Table<D extends object>({
  columns,
  data,
  getRowProps,
  onRowClick,
}: TableProps<D>) {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <MTable {...getTableProps()} highlightOnHover fontSize="md">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              {...getRowProps?.(row)}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </MTable>
  );
}
