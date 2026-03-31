import React, { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { tableStyles } from "../../utils/tableStyles.js";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeFilter = searchParams.get("employeeId") || "";

  const fetchLeave = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;

        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeRefId: leave.employeeId?._id || "",
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "Unknown Employee",
          department: leave.employeeId?.department?.dep_name || "Unassigned",
          leaveType: leave.leaveType,
          days:
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status,
          action: <LeaveButtons id={leave._id} />,
        }));

        setLeaves(data);
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message || "Failed to load leaves");
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const employeeScopedLeaves = (leaves || []).filter((leave) => {
    if (!employeeFilter) {
      return true;
    }

    return leave.employeeRefId === employeeFilter;
  });

  const filteredLeaves = employeeScopedLeaves.filter((leave) => {
    const matchesSearch = [
      leave.employeeId,
      leave.name,
      leave.department,
      leave.leaveType,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : leave.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!leaves) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const clearEmployeeFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Leave Desk</p>
          <h3 className="section-title">Manage leaves</h3>
          <p className="section-copy">
            Review employee leave activity with cleaner scanning and faster
            access to detail pages.
          </p>
          {employeeFilter && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="status-pill status-pending">
                Filtered to selected employee
              </span>
              <button
                type="button"
                className="action-button action-button-view"
                onClick={clearEmployeeFilter}
              >
                Show All Leaves
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-shell">
        <input
          type="text"
          placeholder="Search by department"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            className={`action-button ${statusFilter === "All" ? "action-button-view" : "action-button-warn"}`}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>
          <button
            className="action-button action-button-warn"
            onClick={() => setStatusFilter("Pending")}
          >
            Pending
          </button>
          <button
            className="action-button action-button-edit"
            onClick={() => setStatusFilter("Approved")}
          >
            Approved
          </button>
          <button
            className="action-button action-button-delete"
            onClick={() => setStatusFilter("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="glass-panel table-shell overflow-hidden p-2">
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          customStyles={tableStyles}
        />
      </div>
    </div>
  );
};

export default Table;
