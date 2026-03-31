import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, SetDepartment] = useState({
    dep_name: " ",
    description: " ",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ems-server-i55t.onrender.com/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="dashboard-content">
      <div className="glass-panel form-shell fade-up max-w-3xl">
        <div className="mb-8">
          <p className="section-eyebrow">Department</p>
          <h2 className="section-title">Add department</h2>
          <p className="section-copy">
            Create a new department with a clear name and short description.
          </p>
        </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dep_name" className="field-label">
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Enter Dep Name"
            className="field-input mt-2"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="description" className="field-label">
            Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Description"
            className="field-input form-textarea mt-2 block w-full"
            rows="4"
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="primary-button w-full sm:w-auto">
            Add Department
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddDepartment;
