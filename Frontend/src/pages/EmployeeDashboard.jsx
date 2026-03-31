import React from "react";
import NavBar from "../components/dashboards/NavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";

const EmployeeDashboard = () => {
  return (
    <div className="app-shell dashboard-shell">
      <Sidebar />
      <div className="dashboard-main">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
