import { Employee } from "app/employees";

export interface Job {
  id: string;
  name: string;
  employeeIds: Employee["id"][];
}

export type AddJobInput = Omit<Job, "id" | "employeeIds">;

export type EditJobInput = Job;
