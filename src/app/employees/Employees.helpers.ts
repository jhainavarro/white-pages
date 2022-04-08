import { useGetEmployees } from "./employees.api";

/**
 * @returns The list of employees ordered by ascending hire date
 */
export function useEmployees() {
  const { data } = useGetEmployees();

  return (data ?? [])
    .slice()
    .sort(
      (a, b) => new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime()
    );
}
