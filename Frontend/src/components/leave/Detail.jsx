import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const updateStatus = async (status) => {
    try {
      setUpdatingStatus(true);
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setLeave(response.data.leave);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Unable to update leave status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/leave/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  return (
    <>
      {leave ? (
        <div className="dashboard-content">
          <div className="glass-panel form-shell fade-up">
            <div className="mb-8">
              <p className="section-eyebrow">Leave Request</p>
              <h2 className="section-title">Leave details</h2>
              <p className="section-copy">
                Review the employee, department, and request reason in a cleaner
                detail layout.
              </p>
            </div>

            <div className="detail-grid">
              <div className="detail-media">
                <img
                  src={`http://localhost:3000/${leave.employeeId?.userId?.profileImage || ""}`}
                  className="detail-avatar"
                  alt={leave.employeeId?.userId?.name || "Employee"}
                />
              </div>

              <div className="detail-stack">
                <div className="detail-item">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">
                    {leave.employeeId?.userId?.name || "Unknown Employee"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Employee ID</span>
                  <span className="detail-value">
                    {leave.employeeId?.employeeId || "N/A"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Leave Type</span>
                  <span className="detail-value">{leave.leaveType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reason</span>
                  <span className="detail-value">{leave.reason}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">
                    {leave.employeeId?.department?.dep_name || "Unassigned"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
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
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="action-button action-button-edit"
                    disabled={updatingStatus || leave.status === "Approved"}
                    onClick={() => updateStatus("Approved")}
                  >
                    {updatingStatus ? "Updating..." : "Approve"}
                  </button>
                  <button
                    type="button"
                    className="action-button action-button-delete"
                    disabled={updatingStatus || leave.status === "Rejected"}
                    onClick={() => updateStatus("Rejected")}
                  >
                    {updatingStatus ? "Updating..." : "Reject"}
                  </button>
                  <button
                    type="button"
                    className="action-button action-button-warn"
                    disabled={updatingStatus || leave.status === "Pending"}
                    onClick={() => updateStatus("Pending")}
                  >
                    {updatingStatus ? "Updating..." : "Mark Pending"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">Loading...</div>
      )}
    </>
  );
};

export default Detail;
