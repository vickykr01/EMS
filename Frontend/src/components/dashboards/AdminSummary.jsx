import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard.jsx";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    monthlySalary: 0,
    leaveApplied: 0,
    leaveApproved: 0,
    leavePending: 0,
    leaveRejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:3000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setStats(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        }

        alert(error.response?.data?.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="glass-panel p-6 text-center text-lg font-semibold">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <section className="glass-panel hero-panel fade-up p-6 md:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--brand-main)]">
          Overview
        </p>
        <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
          Dashboard overview
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
          Keep an eye on your workforce, departments, salary flow, and leave
          movement through one refreshed operations screen.
        </p>
      </section>

      <div className="stats-grid mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={stats.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={stats.totalDepartments}
          color="bg-yellow-500"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={stats.monthlySalary}
          color="bg-red-500"
        />
      </div>

      <section className="mt-8">
        <div className="mb-5">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-[var(--ink-soft)]">
            Team Activity
          </p>
          <h4 className="mt-2 text-2xl font-semibold">Leave insights</h4>
        </div>

        <div className="stats-grid">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={stats.leaveApplied}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={stats.leaveApproved}
            color="bg-green-500"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={stats.leavePending}
            color="bg-yellow-500"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={stats.leaveRejected}
            color="bg-red-500"
          />
        </div>
      </section>
    </div>
  );
};

export default AdminSummary;
