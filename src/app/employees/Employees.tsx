import React, { useState } from "react";
import { Button, Header } from "shared/components";
import { ReactComponent as AddIcon } from "shared/icons/plus.svg";
import { EmployeesList } from "./view/EmployeesList";
import { SaveEmployeeForm } from "./save/SaveEmployeeForm";
import { ConfirmDeleteEmployee } from "./delete/ConfirmDeleteEmployee";
import { Employee } from "./employee.models";
import { useEmployees } from "./employees.utils";
import { useStyles } from "./Employees.styles";

export function Employees() {
  const { classes } = useStyles();
  const employees = useEmployees();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee>();

  return (
    <>
      <div className={classes.header}>
        <Header className={classes.tableHeader}>Employees</Header>
        <Button
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
      </div>

      <EmployeesList
        employees={employees}
        onEditClick={(e) => {
          setShowSaveForm(true);
          setEmployeeToEdit(e);
        }}
        onDeleteClick={(e) => {
          setShowConfirmDelete(true);
          setEmployeeToDelete(e);
        }}
      />

      <SaveEmployeeForm
        employee={employeeToEdit}
        open={showSaveForm}
        onSave={() => setShowSaveForm(false)}
        onClose={() => setShowSaveForm(false)}
      />

      <ConfirmDeleteEmployee
        employee={employeeToDelete}
        open={showConfirmDelete}
        onDelete={() => {
          setShowConfirmDelete(false);
          setEmployeeToDelete(undefined);
        }}
        onClose={() => {
          setShowConfirmDelete(false);
          setEmployeeToDelete(undefined);
        }}
      />
    </>
  );
}
