import { z } from "zod";
import { Job } from "../job.models";
import { getJobs } from "../jobs.api";

/**
 * Shape of the form data
 */
export type Inputs = {
  id?: string;
  name: string;
  color: string;
};

export const schema = z
  .object({
    name: z.preprocess(
      (value) => (typeof value === "string" ? value.trim() : value),
      z.string().min(1, { message: "Job name is required" })
    ),
    color: z.string().min(1),
    id: z.string().optional(),
  })
  .refine((v) => !isDupeName(v.name, v.id), {
    message: "There is already a job with that name",
    path: ["name"],
  });

/**
 * @returns The default values for the form
 */
export function getDefaultValues(job?: Job): Inputs {
  return {
    id: job?.id,
    name: job?.name ?? "",
    color: job?.color ?? "dark",
  };
}

/**
 * @returns whether there is already a saved job with a similar name
 */
export function isDupeName(name: string, jobId?: Job["id"]) {
  return getJobs().some((job) => job.name === name && job.id !== jobId);
}
