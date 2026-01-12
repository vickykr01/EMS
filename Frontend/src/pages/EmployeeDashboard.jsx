import React from "react";
import NavBar from "../components/dashboards/NavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
const EmployeeDashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default EmployeeDashboard;
