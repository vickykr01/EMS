import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
  let sno = 1;
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchLeaves = useCallback(async () => {
    if (!user?._id) {
      return;
    }

    try {
      const response = await axios.get("https://ems-server-i55t.onrender.com/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        // filter leaves for current user
        const employeeLeaves = response.data.leaves.filter(
          (leave) => leave.employeeId.userId._id === user._id,
        );
        setLeaves(employeeLeaves);
      }
    } catch (error) {
      alert(error.message);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const filteredLeaves = leaves.filter((leave) =>
    [leave.leaveType, leave.reason, leave.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Leave History</p>
          <h3 className="section-title">Manage leaves</h3>
          <p className="section-copy">
            Review your leave requests with a cleaner layout and clearer status
            visibility.
          </p>
        </div>
      </div>
      <div className="toolbar-shell">
        <input
          type="text"
          placeholder="Search leave records"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="primary-button"
        >
          Add Leave
        </Link>
      </div>
      <div className="glass-panel table-shell overflow-hidden">
      <table className="table-lite mt-2">
        <thead>
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => (
            <tr key={leave._id}>
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">
                <span
                  className={`status-pill ${
                    leave.status === "Approved"
                      ? "status-approved"
                      : leave.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {filteredLeaves.length === 0 && (
        <div className="mt-4 text-sm text-[var(--ink-soft)]">
          No leave records matched your search.
        </div>
      )}
    </div>
  );
};

export default List;
