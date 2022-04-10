import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  topbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: theme.spacing.xs,
    paddingInline: theme.spacing.xl,
    background: theme.fn.linearGradient(
      133,
      theme.colors.green[4],
      theme.colors.teal[4]
    ),
    color: theme.white,
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  navName: {
    fontSize: 32,
  },
  navLink: {
    position: "relative",
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.lg,
    fontWeight: "bold",
    marginInline: theme.spacing.lg,
    "::after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "0.1em",
      backgroundColor: theme.colors.violet[9],
      opacity: 0,
      transition: "opacity 300ms, transform 300ms",
    },
    ":focus": {
      outline: "none",
    },
    ":hover::after, :focus::after, &.active::after": {
      opacity: 1,
      transform: "translate3d(0, 0.2em, 0)",
    },
    "&.active": {
      color: theme.colors.violet[9],
    },
  },
  content: {
    paddingBlock: theme.spacing.lg,
    paddingInline: 32,
  },
}));
