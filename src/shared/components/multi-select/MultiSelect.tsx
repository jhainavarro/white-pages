import React from "react";
import {
  MultiSelect as MMultiSelect,
  MultiSelectProps as MMultiSelectProps,
  SelectItem as MSelectItem,
} from "@mantine/core";

export type SelectItem = MSelectItem;

export type MultiSelectProps = MMultiSelectProps;

export const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  (props, ref) => {
    return (
      <MMultiSelect
        limit={5}
        ref={ref}
        searchable
        clearSearchOnBlur
        {...props}
      />
    );
  }
);
