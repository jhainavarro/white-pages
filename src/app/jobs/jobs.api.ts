import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddJobInput, EditJobInput, Job } from "./job.models";

const JOBS_KEY = "jobs";

/**
 * @returns The list of jobs
 */
export function getJobs() {
  const list = window.localStorage.getItem(JOBS_KEY);

  return list ? (JSON.parse(list) as Job[]) : [];
}

export function useGetJobs() {
  return useQuery(JOBS_KEY, () => getJobs());
}

/**
 * Adds a new job
 *
 * @param input
 */
function addJob(input: AddJobInput) {
  return new Promise<Job>((resolve, reject) => {
    const newJob: Job = {
      ...input,
      id: `${Date.now()}`,
      employeeIds: [],
    };

    try {
      const list = getJobs().concat(newJob);

      window.localStorage.setItem(JOBS_KEY, JSON.stringify(list));
      resolve(newJob);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to add job"));
    }
  });
}

/**
 * Updates an existing job
 * Throws an error if the job does not exist
 *
 * @param input
 */
export function updateJob(input: EditJobInput) {
  return new Promise<Job>((resolve, reject) => {
    const list = getJobs();
    const jobIndex = list.findIndex((j) => j.id === input.id);

    if (jobIndex === -1) {
      reject(new Error(`Job with id=${input.id} does not exist`));
    }

    try {
      list.splice(jobIndex, 1, input);

      window.localStorage.setItem(JOBS_KEY, JSON.stringify(list));
      resolve(input);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to edit job"));
    }
  });
}

export function useSaveJob() {
  const queryClient = useQueryClient();

  return useMutation<Job, Error, Job | AddJobInput>(
    (input: AddJobInput | EditJobInput) =>
      "id" in input && input.id ? updateJob(input) : addJob(input),
    {
      onSuccess() {
        queryClient.invalidateQueries(JOBS_KEY);
      },
    }
  );
}

/**
 * Deletes a job
 * Throws an error if the job has assigned employees -- need to unassign them first
 * Throws an error if the job does not exist
 *
 * @param id
 * @returns
 */
function deleteJob(id: Job["id"]) {
  return new Promise<void>((resolve, reject) => {
    const list = getJobs();
    const jobIndex = list.findIndex((j) => j.id === id);

    if (list[jobIndex].employeeIds.length > 0) {
      reject(new Error("Cannot delete a job with assigned employees"));
    }

    try {
      list.splice(jobIndex, 1);

      window.localStorage.setItem(JOBS_KEY, JSON.stringify(list));
      resolve();
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to delete job"));
    }
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Job["id"]>((id: Job["id"]) => deleteJob(id), {
    onSuccess() {
      queryClient.invalidateQueries(JOBS_KEY);
    },
  });
}
