import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { Table } from "shared/components/table";
import { Employee } from "../employee.models";

interface EmployeesListProps {
  employees: Employee[];
  onEditClick: (e: Employee) => void;
  onDeleteConfirm: (e: Employee) => void;
}

export function EmployeesList({
  employees,
  onEditClick,
  onDeleteConfirm,
}: EmployeesListProps) {
  const data: Employee[] = useMemo(() => employees, [employees]);

  const columns: Column<Employee>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          const e = cell.row.original;
          return (
            <>
              <img src={e.avatarUrl} alt={`Avatar of ${e.name}`} />
              <span>{e.name}</span>
            </>
          );
        },
      },
      {
        Header: "Date hired",
        accessor: "hireDate",
      },
      {
        Header: "Featured",
        accessor: "isFeatured",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: " ",
        accessor: "id",
        id: "edit",
        Cell: ({ cell }) => (
          <button type="button" onClick={() => onEditClick(cell.row.original)}>
            Edit
          </button>
        ),
      },
      {
        Header: " ",
        accessor: "id",
        id: "delete",
        Cell: ({ cell }) => {
          const [showConfirm, setShowConfirm] = useState(false);

          return showConfirm ? (
            <div>
              Are you sure you want to delete this record?
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  onDeleteConfirm(cell.row.original);
                }}
              >
                Yes, delete it
              </button>
              <button type="button" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setShowConfirm(true)}>
              Delete
            </button>
          );
        },
      },
    ],
    [onDeleteConfirm, onEditClick]
  );

  return <Table columns={columns} data={data} />;
}
