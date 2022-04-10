import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { Button } from "shared/components/button";
import { Table } from "shared/components/table";
import { Job } from "../job.models";
import { useStyles } from "./JobsList.styles";

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
  const { classes } = useStyles();
  const data: Job[] = useMemo(() => jobs, [jobs]);
  const columns: Column<Job>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "# of Employees",
        accessor: (row) => row.employeeIds.length,
        id: "employeesCount",
      },
      {
        Header: " ",
        accessor: "id",
        id: "actions",
        Cell: ({ cell }) => {
          const [showConfirm, setShowConfirm] = useState(false);

          // Can only delete jobs without any assigned employees
          if (cell.row.original.employeeIds.length > 0) {
            return <>&nbsp;</>;
          }

          return (
            <div className={classes.actions}>
              <Button
                variant="subtle"
                onClick={() => onEditClick(cell.row.original)}
              >
                Edit
              </Button>

              {showConfirm ? (
                <div>
                  Are you sure you want to delete this record?
                  <Button
                    onClick={() => {
                      setShowConfirm(false);
                      onDeleteConfirm(cell.row.original);
                    }}
                  >
                    Yes, delete it
                  </Button>
                  <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
                </div>
              ) : (
                <Button
                  color="red"
                  variant="subtle"
                  onClick={(event: React.MouseEvent) => {
                    setShowConfirm(true);
                    // Triggers the click handler as if the row is clicked
                    event.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [onDeleteConfirm, onEditClick, classes]
  );

  return jobs.length > 0 ? (
    <Table
      columns={columns}
      data={data}
      getRowProps={() => ({ className: classes.row })}
      onRowClick={(j) => onEditClick(j)}
    />
  ) : (
    <p className={classes.emptyText}>No jobs yet</p>
  );
}
