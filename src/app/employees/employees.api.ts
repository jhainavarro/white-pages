import {
  AddEmployeeInput,
  EditEmployeeInput,
  Employee,
} from "./employee.models";

const EMPLOYEES_KEY = "employees";

/**
 * @returns The list of employee records stored
 */
export function getEmployees(): Employee[] {
  const list = window.localStorage.getItem(EMPLOYEES_KEY);

  // Assumes that the format of saved details is correct
  return list ? (JSON.parse(list) as Employee[]) : [];
}

/**
 * @param input Details of employee to be added
 * @returns The new Employee object
 */
export function addEmployee(input: AddEmployeeInput): Employee {
  const newEmployee = {
    ...input,
    id: `${Date.now()}`, // Can also get from a UUID generator
  };
  const list = getEmployees().concat(newEmployee);

  try {
    window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
    throw new Error("Unable to add employee record");
  }

  return newEmployee;
}

/**
 * @param input Updated details of the employee
 * @returns The updated Employee object
 */
export function updateEmployee(input: EditEmployeeInput): Employee {
  const list = getEmployees();
  const employeeIndex = list.findIndex((e) => e.id === input.id);

  list.splice(employeeIndex, 1, input);

  try {
    window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
    throw new Error("Unable to edit employee record");
  }

  return input;
}

/**
 * @param id of employee to delete
 */
export function deleteEmployee(id: Employee["id"]): void {
  const list = getEmployees();
  const employeeIndex = list.findIndex((e) => e.id === id);

  list.splice(employeeIndex, 1);

  try {
    window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
    throw new Error("Unable to delete employee record");
  }
}
