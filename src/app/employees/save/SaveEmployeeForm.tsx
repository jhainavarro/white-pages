import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getAvatar,
  getDefaultValues,
  Inputs,
} from "./SaveEmployeeForm.helpers";
import "./SaveEmployeeForm.css";
import { Employee } from "../employee.models";
import { useSaveEmployee } from "../employees.api";
import { useGetJobs } from "app/jobs/jobs.api";

interface SaveEmployeeFormProps {
  employee?: Employee;
  onSave: () => void;
  onClose: () => void;
}

export function SaveEmployeeForm({
  employee,
  onSave,
  onClose,
}: SaveEmployeeFormProps) {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* AVATAR */}
      <div>
        <img
          src={watch("avatarUrl")}
          alt="Employee avatar"
          className="avatar"
        />
        <button
          type="button"
          onClick={() => setValue("avatarUrl", getAvatar())}
        >
          Refresh
        </button>
      </div>

      {/* NAME */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder="Jane Santos"
          autoComplete="off"
          autoFocus
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
        <button type="submit">Save</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
        <button type="button" onClick={() => onClose()}>
          Cancel
        </button>

        <p>{result}</p>
      </div>
    </form>
  );
}
