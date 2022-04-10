import React, { useState } from "react";
import { Button } from "shared/components/button";
import { Header } from "shared/components/header";
import { ReactComponent as AddIcon } from "shared/icons/plus.svg";
import { ConfirmDeleteJob } from "./delete/ConfirmDeleteJob";
import { Job } from "./job.models";
import { useStyles } from "./Jobs.styles";
import { useJobs } from "./jobs.utils";
import { SaveJobForm } from "./save/SaveJobForm";
import { JobsList } from "./view/JobsList";

export function Jobs() {
  const jobs = useJobs();
  const { classes } = useStyles();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job>();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job>();

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
        onEditClick={(j) => {
          setShowSaveForm(true);
          setJobToEdit(j);
        }}
        onDeleteClick={(j) => {
          setShowConfirmDelete(true);
          setJobToDelete(j);
        }}
      />

      <SaveJobForm
        job={jobToEdit}
        open={showSaveForm}
        onSave={() => setShowSaveForm(false)}
        onClose={() => setShowSaveForm(false)}
      />

      <ConfirmDeleteJob
        job={jobToDelete}
        open={showConfirmDelete}
        onDelete={() => {
          setShowConfirmDelete(false);
          setJobToDelete(undefined);
        }}
        onClose={() => {
          setShowConfirmDelete(false);
          setJobToDelete(undefined);
        }}
      />
    </>
  );
}
