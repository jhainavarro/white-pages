import "@splidejs/react-splide/css";
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Employee, useEmployees } from "app/employees";
import { JobBadge, useJobsMap } from "app/jobs";
import { Button, Carousel, CarouselItem, Table } from "shared/components";
import EmptyImg from "shared/icons/people-illus-1.jpg";
import { useStyles } from "./Home.styles";

export function Home() {
  const { classes, cx } = useStyles();
  const allEmployees = useEmployees();
  const jobsMap = useJobsMap();
  const featuredEmployees = useEmployees((e) => e.isFeatured);
  const [highlighted, setHighlighted] = useState<Employee>();
  const data: Employee[] = useMemo(() => allEmployees, [allEmployees]);
  const columns: Column<Employee>[] = [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ cell }) => {
        const e = cell.row.original;
        return (
          <div className={classes.nameCell}>
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
      Header: "Date hired",
      accessor: (row) => row.hireDate.toLocaleDateString(),
      id: "hireDate",
    },
    {
      Header: "Jobs",
      accessor: "id",
      id: "jobs",
      Cell: ({ cell }) => (
        <div className={classes.jobCell}>
          {cell.row.original.jobIds.map((jobId) => {
            const job = jobsMap.get(jobId);
            return job ? <JobBadge key={job.id} job={job} /> : <></>;
          })}
        </div>
      ),
    },
  ];

  if (data.length === 0) {
    return (
      <div className={cx(classes.container, classes.empty)}>
        <img
          src={EmptyImg}
          alt="Add employees now"
          className={classes.emptyImage}
        />
        <p className={classes.emptyText}>No records yet</p>
        <Button<typeof Link>
          component={Link}
          to="/manage/employees"
          className={classes.employeesLink}
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          size="lg"
        >
          Start adding employees
        </Button>
        <p>
          and <span className={classes.gradientText}>feature</span> them here on
          the homepage!
        </p>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {featuredEmployees.length > 0 && (
        <div className={classes.carousel}>
          <Carousel>
            {featuredEmployees.map((e) => (
              <CarouselItem
                key={e.id}
                onMouseEnter={() => setHighlighted(e)}
                onMouseLeave={() => setHighlighted(undefined)}
              >
                <img
                  src={e.avatarUrl}
                  alt={e.name}
                  className={classes.carouselImg}
                />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      )}

      {/* TODO: Scroll to table row on highlight */}
      <div className={classes.table}>
        <Table
          columns={columns}
          data={data}
          getRowProps={(row) => ({
            className: cx({
              [classes.highlighted]: row.original.id === highlighted?.id,
            }),
          })}
        />
      </div>
    </div>
  );
}
