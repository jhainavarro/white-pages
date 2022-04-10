import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  avatarPicker: {
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
  },
  refreshButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  refreshIcon: {
    height: 12,
    width: 12,
    fill: theme.colors.violet,
  },
  formField: {
    marginTop: theme.spacing.md,
  },
  isFeaturedCheckbox: {
    marginTop: 32,
  },
}));
