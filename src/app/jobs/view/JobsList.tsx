import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { Table } from "shared/components/table";
import { Job } from "../job.models";

interface JobsListProps {
  jobs: Job[];
  onEditClick: (j: Job) => void;
  onDeleteConfirm: (j: Job) => void;
}

export function JobsList({
  jobs,
  onEditClick,
  onDeleteConfirm,
}: JobsListProps) {
  const data: Job[] = useMemo(() => jobs, [jobs]);

  const columns: Column<Job>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "# of Employees",
        accessor: (row) => row.employees.length,
        id: "employeesCount",
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

          // Can only delete jobs without any assigned employees
          if (cell.row.original.employees.length > 0) {
            return <>&nbsp;</>;
          }

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

  return jobs.length > 0 ? (
    <Table columns={columns} data={data} />
  ) : (
    <p>No jobs yet</p>
  );
}
