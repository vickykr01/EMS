import React from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboards/AdminSidebar";
import NavBar from "../components/dashboards/NavBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
