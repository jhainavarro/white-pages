import { Job } from "../job.models";
import { getJobs } from "../jobs.api";

export type Inputs = {
  name: string;
};

export function getDefaultValues(job?: Job): Inputs {
  return {
    name: job?.name ?? "",
  };
}

export function isDupeName(name: string) {
  return getJobs().some((job) => job.name === name);
}
