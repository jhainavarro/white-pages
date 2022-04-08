import React from "react";
import { Link } from "react-router-dom";
import { Routing } from "./Routing";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="App-header">Welcome to White Pages!</h1>

        <nav className="App-nav">
          <Link className="App-link" to="/">
            Home
          </Link>
          <Link className="App-link" to="/manage/employees">
            Employees
          </Link>
          <Link className="App-link" to="/manage/jobs">
            Jobs
          </Link>
        </nav>

        <Routing />
      </div>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
