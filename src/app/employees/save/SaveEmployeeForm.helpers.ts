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
export function getDefaultValues(): Inputs {
  return {
    name: "",
    avatarUrl: getAvatar(),
    isFeatured: false,
    hireDate: "",
  };
}

/**
 * @returns A URL to a random avatar for the employee
 */
export function getAvatar(): string {
  return `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`;
}
