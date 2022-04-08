import { Employee } from "../employee.models";

/**
 * Shape of the form data
 */
export type Inputs = {
  name: string;
  avatarUrl: string;
  isFeatured: boolean;
  hireDate: string;
};

/**
 * @returns The default values for the form
 */
export function getDefaultValues(employee?: Employee): Inputs {
  return {
    name: employee?.name ?? "",
    avatarUrl: employee?.avatarUrl ?? getAvatar(),
    isFeatured: employee?.isFeatured ?? false,
    hireDate: employee?.hireDate ?? "",
  };
}

/**
 * @returns A URL to a random avatar for the employee
 */
export function getAvatar() {
  return `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`;
}