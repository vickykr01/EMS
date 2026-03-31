import React from "react";
import AdminSidebar from "../components/dashboards/AdminSidebar";
import NavBar from "../components/dashboards/NavBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="app-shell dashboard-shell">
      <AdminSidebar />
      <div className="dashboard-main">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
