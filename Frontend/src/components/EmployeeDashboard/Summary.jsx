import React from "react";
import { useAuth } from "../../context/authContext";
import { FaUser } from "react-icons/fa";

const Summary = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="dashboard-content">Loading...</div>;
  }

  return (
    <div className="dashboard-content">
      <div className="glass-panel hero-panel fade-up p-6 md:p-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-2xl text-white shadow-lg">
          <FaUser />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--brand-main)]">
          Personal Hub
        </p>
        <h2 className="mt-3 text-3xl font-semibold">Welcome back, {user.name}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
          Review your profile, manage leave requests, and stay aligned with your
          payroll updates from a calmer workspace.
        </p>
      </div>
    </div>
  );
};

export default Summary;
