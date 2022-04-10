import { ButtonProps as MButtonProps } from "@mantine/core";

// Consider wrapping in own component if we want to extend the functionality or enforce restrictions
export { Button } from "@mantine/core";
export type ButtonProps<C = "button"> = MButtonProps<C>;
