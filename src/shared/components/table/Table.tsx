import React from "react";
import { Column, Row, useTable } from "react-table";
import "./Table.css";

interface TableProps<D extends object> {
  columns: Column<D>[];
  data: D[];

  // For customizing the table props. Add more as needed (eg, for columns, headers, etc)
  getRowProps?: (row: Row<D>) => object;
}

export function Table<D extends object>({
  columns,
  data,
  getRowProps,
}: TableProps<D>) {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} className="Table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="Table-header">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()} {...getRowProps?.(row)}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="Table-cell">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
