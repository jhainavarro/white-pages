import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddJobInput, EditJobInput, Job } from "./job.models";

const JOBS_KEY = "jobs";

export function getJobs() {
  const list = window.localStorage.getItem(JOBS_KEY);

  return list ? (JSON.parse(list) as Job[]) : [];
}

export function useGetJobs() {
  return useQuery(JOBS_KEY, () => getJobs());
}

function addJob(input: AddJobInput) {
  return new Promise<Job>((resolve, reject) => {
    const newJob: Job = {
      ...input,
      id: `${Date.now()}`,
      employees: [],
    };
    const list = getJobs().concat(newJob);

    try {
      window.localStorage.setItem(JOBS_KEY, JSON.stringify(list));
      resolve(newJob);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to add job"));
    }
  });
}

function updateJob(input: EditJobInput) {
  return new Promise<Job>((resolve, reject) => {
    const list = getJobs();
    const jobIndex = list.findIndex((j) => j.id === input.id);

    list.splice(jobIndex, 1, input);

    try {
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
      "id" in input ? updateJob(input) : addJob(input),
    {
      onSuccess() {
        queryClient.invalidateQueries(JOBS_KEY);
      },
    }
  );
}

function deleteJob(id: Job["id"]) {
  return new Promise<void>((resolve, reject) => {
    const list = getJobs();
    const jobIndex = list.findIndex((j) => j.id === id);

    if (list[jobIndex].employees.length > 0) {
      reject(new Error("Cannot delete a job with assigned employees"));
    }

    list.splice(jobIndex, 1);

    try {
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
