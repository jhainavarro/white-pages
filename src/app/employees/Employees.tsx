import React, { useState } from "react";
import { ReactComponent as AddIcon } from "shared/icons/plus.svg";
import { useDeleteEmployee } from "./employees.api";
import { Employee } from "./employee.models";
import { useEmployees } from "./employees.utils";
import { EmployeesList } from "./view/EmployeesList";
import { SaveEmployeeForm } from "./save/SaveEmployeeForm";
import { useStyles } from "./Employees.styles";
import { Button } from "shared/components/button";

export function Employees() {
  const employees = useEmployees();
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();
  const { classes } = useStyles();

  return (
    <>
      <Button
        className={classes.addButton}
        leftIcon={<AddIcon className={classes.addIcon} />}
        size="lg"
        variant="gradient"
        gradient={{ from: "cyan", to: "indigo" }}
        onClick={() => {
          setShowSaveForm(true);
          setEmployeeToEdit(undefined);
        }}
      >
        Add
      </Button>

      <EmployeesList
        employees={employees}
        onDeleteConfirm={(e) => deleteEmployee(e.id)}
        onEditClick={(e) => {
          setShowSaveForm(true);
          setEmployeeToEdit(e);
        }}
      />

      <SaveEmployeeForm
        employee={employeeToEdit}
        open={showSaveForm}
        onSave={() => setShowSaveForm(false)}
        onClose={() => setShowSaveForm(false)}
      />
    </>
  );
}
