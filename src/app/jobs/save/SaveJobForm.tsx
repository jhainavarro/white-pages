import React from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorPicker } from "shared/components/color-picker";
import { Job } from "../job.models";
import { useSaveJob } from "../jobs.api";
import { getDefaultValues, Inputs, isDupeName } from "./SaveJobForm.helpers";

interface SaveJobFormProps {
  job?: Job;
  onSave: () => void;
  onClose: () => void;
}

export function SaveJobForm({ job, onSave, onClose }: SaveJobFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Inputs>({
    defaultValues: getDefaultValues(job),
  });
  const { mutate: saveJob } = useSaveJob();

  const [result, setResult] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const jobToSave = job ? { ...job, ...data } : data;

    saveJob(jobToSave, {
      onSuccess() {
        setResult("Successfully saved job details!");
        onSave();
      },
      onError(e) {
        setResult(e.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          {...register("name", {
            required: { value: true, message: "Please enter a job name" },
            validate: (v) =>
              !isDupeName(v, job?.id) ||
              "There is already a job with that name",
          })}
          placeholder="Sales Representative"
          autoComplete="off"
          autoFocus
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div style={{ marginBlock: "12px" }}>
        <ColorPicker
          {...register("color")}
          value={watch("color")}
          onSelect={(c) => setValue("color", c)}
        />
      </div>

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
