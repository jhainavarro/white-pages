import { Employee } from "./employee.models";
import { useGetEmployees } from "./employees.api";

type UseEmployeesFilter = (e: Employee) => boolean;

/**
 * @returns The list of employees, optionally filtered and
 * ordered by ascending hire date
 */
export function useEmployees(filter?: UseEmployeesFilter) {
  let { data = [] } = useGetEmployees();

  if (filter) {
    data = data.filter((e) => filter(e));
  }

  data.sort((a, b) => a.hireDate.getTime() - b.hireDate.getTime());

  return data;
}
