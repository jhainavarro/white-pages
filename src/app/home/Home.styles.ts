import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "100%",
  },
  carousel: {
    maxWidth: 300,
    margin: "0 auto 32px",
  },
  carouselImg: {
    height: 300,
    width: 300,
  },
  table: {
    flexGrow: 1,
  },
  highlighted: {
    background: theme.colors.lime[2],
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
  empty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: "50%",
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: 600,
    marginTop: 24,
  },
  employeesLink: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  gradientText: {
    background: `linear-gradient(120deg, ${theme.colors.orange[4]}, ${theme.colors.orange[8]})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontWeight: 800,
  },
}));
