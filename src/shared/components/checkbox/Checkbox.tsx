import React from "react";
import {
  Checkbox as MCheckbox,
  CheckboxProps as MCheckboxProps,
} from "@mantine/core";
import { useStyles } from "./Checkbox.styles";

export type CheckboxProps = MCheckboxProps;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { classes } = useStyles();

    return (
      <MCheckbox
        {...props}
        checked={Boolean(props.value)}
        ref={ref}
        classNames={classes}
      />
    );
  }
);
