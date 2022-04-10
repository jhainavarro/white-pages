import { Job } from "app/jobs";

export interface Employee {
  id: string;
  name: string;
  avatarUrl: string;
  isFeatured: boolean;
  hireDate: Date;
  jobIds: Job["id"][];
}

/**
 * 1. Derived from the base `Employee` interface for simplicity
 *    If we want more flexibility, we can enumerate the fields instead
 * 2. Consider using a UNIX timestamp or something explicitly absolute for the
 *    `hireDate` if we need to display it for different timezones or locales
 */
export type AddEmployeeInput = Omit<Employee, "id">;

export type EditEmployeeInput = Employee;
