import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const userId = user._id || user.id;

  const getNavClass = ({ isActive }) =>
    `nav-pill ${isActive ? "nav-pill-active" : ""}`;

  return (
    <div className="sidebar-surface text-white">
      <div className="brand-mark flex h-20 items-center justify-center">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            Workspace
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Employee MS</h3>
        </div>
      </div>
      <div className="space-y-2 px-4 py-6">
        <NavLink to="/employee-dashboard" className={getNavClass} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${userId}`}
          className={getNavClass}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/employee-dashboard/leaves" className={getNavClass}>
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${userId}`}
          className={getNavClass}
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/employee-dashboard/setting" className={getNavClass}>
          <FaCogs />
          <span>Setting</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
