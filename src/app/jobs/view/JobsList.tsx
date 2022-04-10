import React, { useMemo } from "react";
import { Column } from "react-table";
import { Button } from "shared/components/button";
import { Table } from "shared/components/table";
import { Job } from "../job.models";
import { JobBadge } from "./JobBadge";
import { useStyles } from "./JobsList.styles";

interface JobsListProps {
  jobs: Job[];
  onEditClick: (j: Job) => void;
  onDeleteClick: (j: Job) => void;
}

export function JobsList({ jobs, onEditClick, onDeleteClick }: JobsListProps) {
  const { classes } = useStyles();
  const data: Job[] = useMemo(() => jobs, [jobs]);
  const columns: Column<Job>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => <JobBadge job={cell.row.original} size="md" />,
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
          const j = cell.row.original;

          // Can only delete jobs without any assigned employees
          if (j.employeeIds.length > 0) {
            return <></>;
          }

          return (
            <div className={classes.actions}>
              <Button variant="subtle" onClick={() => onEditClick(j)}>
                Edit
              </Button>

              <Button
                color="red"
                variant="subtle"
                onClick={(event: React.MouseEvent) => {
                  onDeleteClick(j);
                  // Triggers the click handler as if the row is clicked
                  event.stopPropagation();
                }}
              >
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    [onDeleteClick, onEditClick, classes]
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
