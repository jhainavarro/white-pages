import { Employee } from "app/employees";

export interface Job {
  id: string;
  name: string;
  employees: Employee[];
}

export type AddJobInput = Omit<Job, "id" | "employees">;

export type EditJobInput = Job;
