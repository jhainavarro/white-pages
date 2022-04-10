import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: theme.spacing.xl,
  },
  addButton: {},
  tableHeader: {
    marginBottom: theme.spacing.lg,
  },
  addIcon: {
    height: 24,
    width: 24,
    fill: theme.white,
  },
}));
