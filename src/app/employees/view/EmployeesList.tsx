import { MouseEvent, useMemo } from "react";
import { Column } from "react-table";
import { JobBadge, useJobsMap } from "app/jobs";
import { Button, Table } from "shared/components";
import { Employee } from "../employee.models";
import { useStyles } from "./EmployeeList.styles";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";

interface EmployeesListProps {
  employees: Employee[];
  onEditClick: (e: Employee) => void;
  onDeleteClick: (e: Employee) => void;
}

export function EmployeesList({
  employees,
  onEditClick,
  onDeleteClick,
}: EmployeesListProps) {
  const jobsMap = useJobsMap();
  const { classes } = useStyles();
  const data: Employee[] = useMemo(() => employees, [employees]);
  const columns: Column<Employee>[] = useMemo(
    () => [
      {
        Header: "Featured",
        accessor: "isFeatured",
        Cell: ({ value }) =>
          value ? <CheckIcon className={classes.isFeaturedIcon} /> : <></>,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell }) => {
          const e = cell.row.original;
          return (
            <div className={classes.nameCell} onClick={() => onEditClick(e)}>
              <img
                src={e.avatarUrl}
                alt={`Avatar of ${e.name}`}
                className={classes.avatar}
              />
              <span className={classes.name}>{e.name}</span>
            </div>
          );
        },
      },
      {
        Header: "Date Hired",
        accessor: (row) => row.hireDate.toLocaleDateString(),
        id: "hireDate",
      },
      {
        Header: "Jobs",
        accessor: "id",
        id: "jobs",
        Cell: ({ cell }) => (
          <div
            className={classes.jobCell}
            onClick={() => onEditClick(cell.row.original)}
          >
            {cell.row.original.jobIds.map((jobId) => {
              const job = jobsMap.get(jobId);
              return job ? <JobBadge key={job.id} job={job} /> : <></>;
            })}
          </div>
        ),
      },
      {
        Header: " ",
        accessor: "id",
        id: "actions",
        Cell: ({ cell }) => {
          const e = cell.row.original;
          return (
            <div className={classes.actions}>
              <Button variant="subtle" onClick={() => onEditClick(e)}>
                Edit
              </Button>

              <Button
                color="red"
                variant="subtle"
                onClick={(event: MouseEvent) => {
                  onDeleteClick(e);
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
    [jobsMap, onDeleteClick, onEditClick, classes]
  );

  return data.length > 0 ? (
    <Table
      columns={columns}
      data={data}
      getRowProps={() => ({ className: classes.row })}
      onRowClick={(e) => onEditClick(e)}
    />
  ) : (
    <p className={classes.emptyText}>No employee records yet</p>
  );
}
