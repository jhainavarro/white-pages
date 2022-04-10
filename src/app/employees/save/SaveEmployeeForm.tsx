import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Modal } from "shared/components/modal";
import { Employee } from "../employee.models";
import { useSaveEmployee } from "../employees.api";
import {
  getAvatar,
  getDefaultValues,
  Inputs,
  schema,
  useJobsOptions,
} from "./SaveEmployeeForm.helpers";
import { useStyles } from "./SaveEmployerForm.styles";
import { TextField } from "shared/components/text-field/TextField";
import { DatePicker } from "shared/components/date-picker";
import { MultiSelect } from "shared/components/multi-select";
import { Checkbox } from "shared/components/checkbox";
import { Avatar } from "shared/components/avatar";
import { IconButton } from "shared/components/button";
import { toast } from "shared/components/toast";
import { ReactComponent as RefreshIcon } from "shared/icons/refresh.svg";

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
  const { classes, cx } = useStyles();
  const jobOptions = useJobsOptions();
  const { mutate: saveEmployee } = useSaveEmployee();
  const form = useForm<Inputs>({
    schema: zodResolver(schema),
    initialValues: getDefaultValues(employee),
  });

  function handleSubmit(data: Inputs) {
    const employeeToSave = employee ? { ...data, id: employee.id } : data;

    saveEmployee(employeeToSave, {
      onSuccess() {
        toast.success({
          title: "Success!",
          message: "New employee record created",
        });
        onSave();
      },
      onError() {
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
      title={employee ? "Edit employee record" : "Add a new employee record"}
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
        <div className={classes.avatarPicker}>
          <Avatar src={form.values.avatarUrl} size={150} />
          <IconButton
            classNames={{ root: classes.refreshButton }}
            icon={<RefreshIcon className={classes.refreshIcon} />}
            compact
            color="violet"
            radius="lg"
            variant="light"
            onClick={() => form.setFieldValue("avatarUrl", getAvatar())}
          />
        </div>

        <TextField
          {...form.getInputProps("name")}
          className={classes.formField}
          label="Name"
          placeholder="Jane Santos"
          autoComplete="off"
          data-autofocus
          required
        />

        <DatePicker
          {...form.getInputProps("hireDate")}
          className={classes.formField}
          label="Date hired"
          placeholder="Select a date"
          required
        />

        {/* TODO: Create new jobs from here for better UX */}
        <MultiSelect
          {...form.getInputProps("jobIds")}
          className={classes.formField}
          data={jobOptions}
          label="Jobs"
          placeholder="Choose one or more jobs"
          nothingFound="No jobs with that name"
          searchable
        />

        <Checkbox
          {...form.getInputProps("isFeatured")}
          className={cx(classes.formField, classes.isFeaturedCheckbox)}
          label="Feature employee on the homepage"
        />
      </form>
    </Modal>
  );
}
