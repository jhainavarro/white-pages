import React, { useMemo, useState } from "react";
import { Column } from "react-table";
import { JobBadge, useJobsMap } from "app/jobs";
import { Button } from "shared/components/button";
import { Table } from "shared/components/table";
import { Employee } from "../employee.models";
import { useStyles } from "./EmployeeList.styles";
import { Modal } from "shared/components/modal";
import { ReactComponent as CheckIcon } from "shared/icons/check.svg";

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
        accessor: "hireDate",
        Cell: ({ cell }) => cell.row.original.hireDate.toLocaleDateString(),
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
          const [showConfirm, setShowConfirm] = useState(false);

          return (
            <div className={classes.actions}>
              <Button
                variant="subtle"
                onClick={() => onEditClick(cell.row.original)}
              >
                Edit
              </Button>

              {showConfirm ? (
                <Modal
                  opened={showConfirm}
                  onClose={() => setShowConfirm(false)}
                  withCloseButton={false}
                  primaryButton={{
                    label: "Yes, delete",
                    color: "red",
                    onClick: () => onDeleteConfirm(cell.row.original),
                  }}
                >
                  <p>
                    Are you sure you want to delete the record for
                    <span>{cell.row.original.name}</span>?
                  </p>
                </Modal>
              ) : (
                <Button
                  color="red"
                  variant="subtle"
                  onClick={(event: React.MouseEvent) => {
                    setShowConfirm(true);
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
    [jobsMap, onDeleteConfirm, onEditClick, classes]
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
