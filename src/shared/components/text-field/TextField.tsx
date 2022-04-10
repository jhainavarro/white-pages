import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { useStyles } from "./TextField.styles";

type TextFieldProps = TextInputProps;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const { classes } = useStyles();

    return (
      <TextInput {...props} ref={ref} variant="default" classNames={classes} />
    );
  }
);
