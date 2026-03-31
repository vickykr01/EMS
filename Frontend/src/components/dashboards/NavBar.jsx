import React from "react";
import { useAuth } from "../../context/authContext.jsx";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="topbar fade-up">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-soft)]">
            Dashboard
          </p>
          <p className="mt-1 text-2xl font-semibold text-[var(--ink-strong)]">
            Welcome, {user?.name || "User"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-[var(--line-soft)] bg-white/60 px-4 py-2 text-sm text-[var(--ink-soft)] sm:block">
            Live workspace
          </div>
          <button className="primary-button !px-5 !py-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
