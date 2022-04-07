import { Employee } from "./employee.models";
import { getEmployees } from "./employees.api";

/**
 * @returns The list of employees ordered by ascending hire date
 */
export function useEmployees(): Employee[] {
  return getEmployees()
    .slice()
    .sort(
      (a, b) => new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime()
    );
}
