import "@splidejs/react-splide/css";
import React, { useMemo } from "react";
import { Column } from "react-table";
import { Employee, useEmployees } from "app/employees";
import { Table } from "shared/components/table";
import { useJobsMap } from "app/jobs";
import { useState } from "react";
import { Carousel, CarouselItem } from "shared/components/carousel";

export function Home() {
  const allEmployees = useEmployees();
  const featuredEmployees = useEmployees((e) => e.isFeatured);
  const [highlighted, setHighlighted] = useState<Employee>();

  const jobsMap = useJobsMap();

  const data: Employee[] = useMemo(() => allEmployees, [allEmployees]);
  const columns: Column<Employee>[] = [
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
      Header: "Jobs",
      accessor: "id",
      id: "jobs",
      Cell: ({ cell }) => (
        <ul>
          {cell.row.original.jobIds.map((jobId) => (
            <li key={jobId}>{jobsMap.get(jobId)?.name}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <h2>Featured Employees</h2>
      <div
        style={{ maxWidth: "300px", margin: "3rem auto", background: "yellow" }}
      >
        <Carousel options={{ autoplay: false }}>
          {featuredEmployees.map((e) => (
            <CarouselItem
              key={e.id}
              onMouseEnter={() => setHighlighted(e)}
              onMouseLeave={() => setHighlighted(undefined)}
            >
              <img
                src={e.avatarUrl}
                alt={e.name}
                style={{
                  height: "300px",
                  width: "300px",
                }}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>

      <h2>All Employees</h2>
      <Table
        columns={columns}
        data={data}
        getRowProps={(row) => ({
          style: {
            background: row.original.id === highlighted?.id ? "red" : undefined,
          },
        })}
      />
    </>
  );
}
