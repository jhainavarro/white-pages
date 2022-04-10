import React from "react";
import { Button, ButtonProps } from ".";

export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Button type="button" {...props}>
      {icon}
    </Button>
  );
}
