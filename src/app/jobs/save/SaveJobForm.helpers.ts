import { Job } from "../job.models";
import { getJobs } from "../jobs.api";

export type Inputs = {
  name: string;
  color: string;
};

export function getDefaultValues(job?: Job): Inputs {
  return {
    name: job?.name ?? "",
    color: job?.color ?? "dark",
  };
}

export function isDupeName(name: string, jobId?: Job["id"]) {
  return getJobs().some((job) => job.name === name && job.id !== jobId);
}
