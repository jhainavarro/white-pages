import { Route, Routes } from "react-router-dom";
import { Employees } from "./employees";
import { Home } from "./home";
import { Jobs } from "./jobs";

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/manage/employees" element={<Employees />} />
      <Route path="/manage/jobs" element={<Jobs />} />
    </Routes>
  );
}
