import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { ColorPicker, Modal, TextField, toast } from "shared/components";
import { Job } from "../job.models";
import { useSaveJob } from "../jobs.api";
import { getDefaultValues, Inputs, schema } from "./SaveJobForm.helpers";
import { useStyles } from "./SaveJobForm.styles";

interface SaveJobFormProps {
  job?: Job;
  open: boolean;
  onSave: () => void;
  onClose: () => void;
}

export function SaveJobForm({ job, open, onSave, onClose }: SaveJobFormProps) {
  const { classes } = useStyles();
  const { mutate: saveJob } = useSaveJob();
  const form = useForm<Inputs>({
    schema: zodResolver(schema),
    initialValues: getDefaultValues(job),
  });

  function handleSubmit(data: Inputs) {
    const jobToSave = job ? { ...job, ...data } : data;

    saveJob(jobToSave, {
      onSuccess() {
        toast.success({
          title: "Success!",
          message: job ? "Job updated" : "New job created",
        });
        onSave();
      },
      onError(e) {
        // TODO: error alert
      },
    });
  }

  useEffect(() => {
    if (open) {
      form.reset();
    }

    /**
     * Form reset updates the local state and triggers infinite re-rendering
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      opened={open}
      title={job ? "Edit job" : "Add a new job"}
      onClose={() => {
        form.reset();
        onClose();
      }}
      primaryButton={{
        label: "Save",
        type: "submit",
        onClick: form.onSubmit(handleSubmit),
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextField
          {...form.getInputProps("name")}
          label="Name"
          placeholder="Customer Support"
          autoComplete="off"
          data-autofocus
          required
        />

        <ColorPicker
          {...form.getInputProps("color")}
          className={classes.colorPicker}
        />
      </form>
    </Modal>
  );
}
