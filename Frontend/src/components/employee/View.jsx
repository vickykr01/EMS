import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchemployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="dashboard-content">
          <div className="glass-panel form-shell fade-up">
            <div className="mb-8">
              <p className="section-eyebrow">Employee Profile</p>
              <h2 className="section-title">Employee details</h2>
              <p className="section-copy">
                Review personal and department information in a cleaner profile
                layout.
              </p>
            </div>

            <div className="detail-grid">
              <div className="detail-media">
                <img
                  src={`http://localhost:3000/${employee.userId?.profileImage || ""}`}
                  className="detail-avatar"
                  alt={employee.userId?.name || "Employee"}
                />
              </div>

              <div className="detail-stack">
                <div className="detail-item">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">
                    {employee.userId?.name || "Unknown Employee"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Employee ID</span>
                  <span className="detail-value">{employee.employeeId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date of Birth</span>
                  <span className="detail-value">
                    {employee.dob
                      ? new Date(employee.dob).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Gender</span>
                  <span className="detail-value">{employee.gender || "N/A"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">
                    {employee.department?.dep_name || "Unassigned"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Marital Status</span>
                  <span className="detail-value">
                    {employee.martialStatus || "N/A"}
                  </span>
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

export default View;
