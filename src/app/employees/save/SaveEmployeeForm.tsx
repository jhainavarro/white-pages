import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetJobs } from "app/jobs/jobs.api";
import { Modal } from "shared/components/modal";
import { Button } from "shared/components/button";
import { Employee } from "../employee.models";
import { useSaveEmployee } from "../employees.api";
import {
  getAvatar,
  getDefaultValues,
  Inputs,
} from "./SaveEmployeeForm.helpers";
import { useStyles } from "./SaveEmployerForm.styles";

interface SaveEmployeeFormProps {
  employee?: Employee;
  open: boolean;
  onSave: () => void;
  onClose: () => void;
}

export function SaveEmployeeForm({
  employee,
  open,
  onSave,
  onClose,
}: SaveEmployeeFormProps) {
  const modalTitle = employee
    ? "Edit employee record"
    : "Add a new employee record";
  const { classes } = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: getDefaultValues(employee),
  });
  const { mutate: saveEmployee } = useSaveEmployee();
  const { data: jobs = [] } = useGetJobs();

  const [result, setResult] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const employeeToSave = employee ? { ...data, id: employee.id } : data;

    saveEmployee(employeeToSave, {
      onSuccess() {
        setResult("Successfully saved employee details!");
        onSave();
      },
      onError() {
        setResult("Unable to save details. Please try again.");
      },
    });
  };

  useEffect(() => {
    reset(getDefaultValues(employee));
  }, [employee, reset]);

  return (
    <Modal opened={open} onClose={onClose} title={modalTitle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* AVATAR */}
        <div>
          <img
            src={watch("avatarUrl")}
            alt="Employee avatar"
            className={classes.avatar}
          />
          <Button onClick={() => setValue("avatarUrl", getAvatar())}>
            Refresh
          </Button>
        </div>

        {/* NAME */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            data-autofocus
            {...register("name", { required: true })}
            placeholder="Jane Santos"
            autoComplete="off"
          />
          {errors.name && <span>Please enter the employee's full name</span>}
        </div>

        {/* HIRE DATE */}
        <div>
          <label htmlFor="hire-date">Date hired:</label>
          {/* https://caniuse.com/mdn-html_elements_input_input-date */}
          <input
            id="hire-date"
            type="date"
            {...register("hireDate", { required: true })}
          />
          {errors.hireDate && (
            <span>Please select the date when the employee was hired</span>
          )}
        </div>

        {/* JOBS */}
        <div>
          <label htmlFor="jobs">Jobs:</label>
          <select id="jobs" {...register("jobIds")} multiple>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.name}
              </option>
            ))}
          </select>
        </div>

        {/* IS FEATURED? */}
        <div>
          <label>
            <input type="checkbox" {...register("isFeatured")} />
            Feature employee on the homepage
          </label>
        </div>

        {/* ACTIONS */}
        <div>
          <Button type="submit">Save</Button>
          <Button onClick={() => reset()}>Reset</Button>
          <Button onClick={() => onClose()}>Cancel</Button>

          <p>{result}</p>
        </div>
      </form>
    </Modal>
  );
}
