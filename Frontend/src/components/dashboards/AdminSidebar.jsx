import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

const AdminSidebar = () => {
  const getNavClass = ({ isActive }) =>
    `nav-pill ${isActive ? "nav-pill-active" : ""}`;

  return (
    <div className="sidebar-surface text-white">
      <div className="brand-mark flex h-20 items-center justify-center">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            Control
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Employee MS</h3>
        </div>
      </div>
      <div className="space-y-2 px-4 py-6">
        <NavLink to="/admin-dashboard" className={getNavClass} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={getNavClass}>
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={getNavClass}>
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={getNavClass}>
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={getNavClass}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/create-user" className={getNavClass}>
          <FaUsers />
          <span>New User</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
