import React, { useState } from "react";
import { Button } from "shared/components/button";
import { Header } from "shared/components/header";
import { ReactComponent as AddIcon } from "shared/icons/plus.svg";
import { Job } from "./job.models";
import { useDeleteJob, useGetJobs } from "./jobs.api";
import { useStyles } from "./Jobs.styles";
import { SaveJobForm } from "./save/SaveJobForm";
import { JobsList } from "./view/JobsList";

export function Jobs() {
  const { data: jobs = [] } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();
  const { classes } = useStyles();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job>();

  return (
    <>
      <div className={classes.header}>
        <Header className={classes.tableHeader}>Jobs</Header>
        <Button
          leftIcon={<AddIcon className={classes.addIcon} />}
          size="lg"
          variant="gradient"
          gradient={{ from: "grape", to: "violet" }}
          onClick={() => {
            setShowSaveForm(true);
            setJobToEdit(undefined);
          }}
        >
          Add
        </Button>
      </div>

      <JobsList
        jobs={jobs}
        onDeleteConfirm={(j) => deleteJob(j.id)}
        onEditClick={(j) => {
          setShowSaveForm(true);
          setJobToEdit(j);
        }}
      />

      <SaveJobForm
        job={jobToEdit}
        open={showSaveForm}
        onSave={() => setShowSaveForm(false)}
        onClose={() => setShowSaveForm(false)}
      />
    </>
  );
}
