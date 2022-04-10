import React from "react";
import {
  DatePicker as MDatePicker,
  DatePickerProps as MDatePickerProps,
} from "@mantine/dates";

type DatePickerProps = MDatePickerProps;

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (props, ref) => {
    return <MDatePicker {...props} ref={ref} firstDayOfWeek="sunday" />;
  }
);
