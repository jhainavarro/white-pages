import { Job } from "./job.models";
import { useGetJobs } from "./jobs.api";

/**
 * @returns A mapping of the jobs where the key is the job ID
 */
export function useJobsMap(): Map<Job["id"], Job> {
  const { data: jobs = [] } = useGetJobs();

  const map = new Map();

  jobs.forEach((job) => {
    map.set(job.id, job);
  });

  return map;
}
