import React from "react";
import { useEmployees } from "./Employees.helpers";
import { SaveEmployeeForm } from "./save/SaveEmployeeForm";
import "./Employees.css";

export function Employees() {
  // TODO: Update list when a new record is added / updated
  const employees = useEmployees();

  return (
    <>
      {employees.length > 0 ? (
        <ul>
          {employees.map((e) => (
            <li key={e.id}>
              <img
                src={e.avatarUrl}
                alt={`Avatar of ${e.name}`}
                className="Employee-avatar"
              />
              <p>{e.name}</p>
              <p>Hired on {e.hireDate}</p>
              {e.isFeatured && <p>(featured)</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No employee records yet</p>
      )}

      <hr />

      <SaveEmployeeForm />
    </>
  );
}
