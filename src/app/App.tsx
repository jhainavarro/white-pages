import React from "react";
import { NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Header, ToastProvider } from "shared/components";
import { Routing } from "./Routing";
import { useStyles } from "./App.styles";

export function App() {
  const queryClient = new QueryClient();
  const { classes } = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className={classes.container}>
          <div className={classes.topbar}>
            <Header className={classes.navName}>White Pages</Header>
            <nav className={classes.nav}>
              <NavLink className={classes.navLink} to="/">
                Home
              </NavLink>
              <NavLink className={classes.navLink} to="/manage/employees">
                Employees
              </NavLink>
              <NavLink className={classes.navLink} to="/manage/jobs">
                Jobs
              </NavLink>
            </nav>
          </div>

          <div className={classes.content}>
            <Routing />
          </div>
        </div>

        <ReactQueryDevtools />
      </ToastProvider>
    </QueryClientProvider>
  );
}
