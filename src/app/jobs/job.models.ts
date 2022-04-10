import { Employee } from "app/employees";
import { BadgeProps } from "shared/components/badge";

export interface Job {
  id: string;
  name: string;
  employeeIds: Employee["id"][];
  color?: BadgeProps["color"];
}

export type AddJobInput = Omit<Job, "id" | "employeeIds">;

export type EditJobInput = Job;
