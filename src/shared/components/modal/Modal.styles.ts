import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: theme.spacing.xl,
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing.md,
  },
}));
