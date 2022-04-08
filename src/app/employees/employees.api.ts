import { useMutation, useQuery, useQueryClient } from "react-query";
import { getJobs, Job, updateJob } from "app/jobs";
import {
  AddEmployeeInput,
  EditEmployeeInput,
  Employee,
} from "./employee.models";
import { getRemovedItems } from "shared/utils";

const EMPLOYEES_KEY = "employees";

/**
 * @returns The list of employee records stored
 */
function getEmployees() {
  const list = window.localStorage.getItem(EMPLOYEES_KEY);

  // Assumes that the format of saved details is correct
  return list ? (JSON.parse(list) as Employee[]) : [];
}

export function useGetEmployees() {
  return useQuery(EMPLOYEES_KEY, () => getEmployees());
}

/**
 * Adds or removes the employee from the given jobs
 *
 * @param action
 * @param employeeId
 * @param jobIds
 */
function updateJobEmployees(
  action: "add" | "remove",
  employeeId: Employee["id"],
  jobIds: Job["id"][]
) {
  const jobs = getJobs();

  // Used `.reduce()` for a more straightforward mapping of the promises
  // as opposed to doing `.map()` + `.filter()` with a type guard to remove
  // the `undefined` values, which might happen if the job ID does not exist
  const updates = jobIds.reduce((list, jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    return job
      ? list.concat(
          updateJob({
            ...job,
            employeeIds:
              action === "add"
                ? job.employeeIds.concat(employeeId)
                : job.employeeIds.filter((eId) => eId !== employeeId),
          })
        )
      : list;
  }, [] as Promise<Job>[]);

  return Promise.all(updates);
}

/**
 * Adds a new employee record
 *
 * @param input
 */
async function addEmployee(input: AddEmployeeInput) {
  return new Promise<Employee>(async (resolve, reject) => {
    const newEmployeeId = `${Date.now()}`; // Can also get from a UUID generator
    const newEmployee: Employee = {
      ...input,
      id: newEmployeeId,
    };

    try {
      const list = getEmployees().concat(newEmployee);

      await updateJobEmployees("add", newEmployeeId, input.jobIds);

      window.localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(list));
      resolve(newEmployee);
    } catch (e) {
      console.error(e);
      reject(new Error("Unable to add employee record"));
    }
  });
}

/**
 * Updates an existing employee record
 * Throws an error if the employee does not exist
 *
 * @param input
 */
function updateEmployee(input: EditEmployeeInput) {
  return new Promise<Employee>(async (resolve, reject) => {
    const list = getEmployees();
    const employeeIndex = list.findIndex((e) => e.id === input.id);

    if (employeeIndex === -1) {
      reject(new Error(`Employee with id=${input.id} does not exist`));
    }

    const storedJobs = list[employeeIndex].jobIds;
    const updatedJobs = input.jobIds;
    const addedJobs = getRemovedItems(updatedJobs, storedJobs);
    const removedJobs = getRemovedItems(storedJobs, updatedJobs);

    try {
      list.splice(employeeIndex, 1, input);

      await updateJobEmployees("add", input.id, addedJobs);
      await updateJobEmployees("remove", input.id, removedJobs);

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

/**
 * Deletes an employee record
 * Throws an error if the employee does not exist
 *
 * @param id
 */
function deleteEmployee(id: Employee["id"]) {
  return new Promise<void>(async (resolve, reject) => {
    const list = getEmployees();
    const employeeIndex = list.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
      reject(new Error(`Employee with id=${id} does not exist`));
    }

    const employee = list[employeeIndex];

    try {
      list.splice(employeeIndex, 1);

      await updateJobEmployees("remove", employee.id, employee.jobIds);

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
