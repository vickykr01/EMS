import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    userId: user?._id || "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [error, setError] = useState("");

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(leave.endDate) < new Date(leave.startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      }
    }
  };
  return (
    <div className="dashboard-content">
      <div className="glass-panel form-shell fade-up">
        <div className="mb-8">
          <p className="section-eyebrow">Leave Request</p>
          <h2 className="section-title">Request leave</h2>
          <p className="section-copy">
            Submit time-off details with a form that is easier to scan and fill.
          </p>
        </div>
      {error && (
        <p className="feedback-banner feedback-banner-error">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="field-label">Leave Type</label>
            <select
              name="leaveType"
              onChange={handleChange}
              value={leave.leaveType}
              className="field-input mt-2 block w-full"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className="form-grid-2">
            <div>
              <label className="field-label">From Date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                value={leave.startDate}
                className="field-input mt-2 block w-full"
                required
              />
            </div>

            <div>
              <label className="field-label">To Date</label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                value={leave.endDate}
                min={leave.startDate || undefined}
                className="field-input mt-2 block w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="field-label">Description</label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              value={leave.reason}
              className="field-input form-textarea mt-2 w-full"
              required
            ></textarea>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button w-full sm:w-auto">
            Add Leave
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Add;
