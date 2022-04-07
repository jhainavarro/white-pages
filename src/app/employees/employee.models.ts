export interface Employee {
  id: string;
  name: string;
  avatarUrl: string;
  isFeatured: boolean;
  hireDate: string; // yyyy-mm-dd
}

// Derived from the base `Employee` interface for simplicity
// If we want more flexibility, we can enumerate the fields instead
export type AddEmployeeInput = Omit<Employee, "id">;

export type EditEmployeeInput = Employee;
