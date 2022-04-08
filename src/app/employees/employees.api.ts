import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AddEmployeeInput,
  EditEmployeeInput,
  Employee,
} from "./employee.models";

const EMPLOYEES_KEY = "employees";

function getEmployees() {
  const list = window.localStorage.getItem(EMPLOYEES_KEY);

  // Assumes that the format of saved details is correct
  return list ? (JSON.parse(list) as Employee[]) : [];
}

export function useGetEmployees() {
  return useQuery(EMPLOYEES_KEY, () => getEmployees());
}

function addEmployee(input: AddEmployeeInput) {
  return new Promise<Employee>((resolve, reject) => {
    const newEmployee = {
      ...input,
      id: `${Date.now()}`, // Can also get from a UUID generator
    };
    const list = getEmployees().concat(newEmployee);

    try {
      window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
      resolve(newEmployee);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to add employee record"));
    }
  });
}

function updateEmployee(input: EditEmployeeInput) {
  return new Promise<Employee>((resolve, reject) => {
    const list = getEmployees();
    const employeeIndex = list.findIndex((e) => e.id === input.id);

    list.splice(employeeIndex, 1, input);

    try {
      window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
      resolve(input);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to edit employee record"));
    }
  });
}

export function useSaveEmployee() {
  const queryClient = useQueryClient();

  return useMutation(
    (input: AddEmployeeInput | EditEmployeeInput) =>
      "id" in input ? updateEmployee(input) : addEmployee(input),
    {
      onSuccess() {
        queryClient.invalidateQueries(EMPLOYEES_KEY);
      },
    }
  );
}

function deleteEmployee(id: Employee["id"]) {
  return new Promise<void>((resolve, reject) => {
    const list = getEmployees();
    const employeeIndex = list.findIndex((e) => e.id === id);

    list.splice(employeeIndex, 1);

    try {
      window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
      resolve();
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to delete employee record"));
    }
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation((id: Employee["id"]) => deleteEmployee(id), {
    onSuccess() {
      queryClient.invalidateQueries(EMPLOYEES_KEY);
    },
  });
}
