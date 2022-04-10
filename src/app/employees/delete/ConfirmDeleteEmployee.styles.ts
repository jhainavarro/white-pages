import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  content: {
    paddingBlock: theme.spacing.md,
    paddingInline: theme.spacing.xl,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginBottom: theme.spacing.md,
  },
  text: {
    paddingInline: theme.spacing.xl,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontWeight: 800,
  },
  subtext: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[6],
    fontStyle: "italic",
  },
}));
