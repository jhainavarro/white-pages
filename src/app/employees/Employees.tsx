import React, { useState } from "react";
import { useEmployees } from "./Employees.helpers";
import { SaveEmployeeForm } from "./save/SaveEmployeeForm";
import "./Employees.css";
import { Employee } from "./employee.models";

export function Employees() {
  const employees = useEmployees();

  const [showSaveForm, setShowSaveForm] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee>();

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

              <button
                type="button"
                onClick={() => {
                  setShowSaveForm(true);
                  setEmployeeToUpdate(e);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employee records yet</p>
      )}

      <button
        type="button"
        onClick={() => {
          setShowSaveForm(true);
          setEmployeeToUpdate(undefined);
        }}
      >
        Add
      </button>

      <hr />

      {showSaveForm && (
        <SaveEmployeeForm
          employee={employeeToUpdate}
          onSave={() => setShowSaveForm(false)}
          onClose={() => setShowSaveForm(false)}
        />
      )}
    </>
  );
}
