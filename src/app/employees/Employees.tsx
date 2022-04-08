import React, { useState } from "react";
import { useEmployees } from "./Employees.helpers";
import { SaveEmployeeForm } from "./save/SaveEmployeeForm";
import "./Employees.css";
import { Employee } from "./employee.models";
import { useDeleteEmployee } from "./employees.api";
import { EmployeesList } from "./view/EmployeesList";

export function Employees() {
  const employees = useEmployees();
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();

  return (
    <>
      <EmployeesList
        employees={employees}
        onDeleteConfirm={(e) => deleteEmployee(e.id)}
        onEditClick={(e) => {
          setShowSaveForm(true);
          setEmployeeToEdit(e);
        }}
      />

      <button
        type="button"
        onClick={() => {
          setShowSaveForm(true);
          setEmployeeToEdit(undefined);
        }}
      >
        Add
      </button>

      <hr />

      {showSaveForm && (
        <SaveEmployeeForm
          employee={employeeToEdit}
          onSave={() => setShowSaveForm(false)}
          onClose={() => setShowSaveForm(false)}
        />
      )}
    </>
  );
}
