import React, { useState } from "react";
import { Job } from "./job.models";
import { useDeleteJob, useGetJobs } from "./jobs.api";
import { SaveJobForm } from "./save/SaveJobForm";
import { JobsList } from "./view/JobsList";

export function Jobs() {
  const { data: jobs = [] } = useGetJobs();
  const { mutate: deleteJob } = useDeleteJob();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [jobToEdit, setJobToEdit] = useState<Job>();

  return (
    <>
      <JobsList
        jobs={jobs}
        onDeleteConfirm={(j) => deleteJob(j.id)}
        onEditClick={(j) => {
          setShowSaveForm(true);
          setJobToEdit(j);
        }}
      />

      <button
        type="button"
        onClick={() => {
          setShowSaveForm(true);
          setJobToEdit(undefined);
        }}
      >
        Add
      </button>

      <hr />

      {showSaveForm && (
        <SaveJobForm
          job={jobToEdit}
          onSave={() => setShowSaveForm(false)}
          onClose={() => setShowSaveForm(false)}
        />
      )}
    </>
  );
}
