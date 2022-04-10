import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  row: {
    cursor: "pointer",
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
  },
  name: {
    marginLeft: "12px",
  },
  jobCell: {
    display: "flex",
    flexFlow: "row wrap",
    gap: 4,
  },
  isFeaturedIcon: {
    height: 20,
    width: 20,
    fill: theme.colors.orange[5],
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
