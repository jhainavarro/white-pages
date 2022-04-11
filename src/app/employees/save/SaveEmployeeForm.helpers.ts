import { z } from "zod";
import { Job, useGetJobs } from "app/jobs";
import { SelectItem } from "shared/components";
import { Employee } from "../employee.models";

/**
 * Shape of the form data
 */
export type Inputs = {
  avatarUrl: string;
  name: string;
  hireDate: Date;
  jobIds: Job["id"][];
  isFeatured: boolean;
};

export const schema = z.object({
  avatarUrl: z.string().url({ message: "Employee photo is required" }),
  name: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().min(1, { message: "Employee name is required" })
  ),
  hireDate: z.date(),
  jobIds: z.string().array(),
  isFeatured: z.boolean(),
});

/**
 * @returns The default values for the form
 */
export function getDefaultValues(employee?: Employee): Inputs {
  return {
    name: employee?.name ?? "",
    avatarUrl: employee?.avatarUrl ?? getAvatar(),
    isFeatured: employee?.isFeatured ?? false,
    hireDate: employee?.hireDate ?? new Date(),
    jobIds: employee?.jobIds ?? [],
  };
}

/**
 * @returns A URL to a random avatar for the employee
 */
export function getAvatar() {
  return `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg?style=circle`;
}

/**
 * @returns A list of multi-select option objects to be used by the multi-select
 */
export function useJobsOptions(): SelectItem[] {
  const { data: jobs = [] } = useGetJobs();

  return jobs.map((job) => ({
    value: job.id,
    label: job.name,
  }));
}
