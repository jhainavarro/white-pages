import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing.md,
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
  },
}));
