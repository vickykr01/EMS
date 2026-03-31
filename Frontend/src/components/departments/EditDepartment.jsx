import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
        // setDepartment(data);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/${id}`,
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
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-content">
          <div className="glass-panel form-shell fade-up max-w-3xl">
            <div className="mb-8">
              <p className="section-eyebrow">Department</p>
              <h2 className="section-title">Edit department</h2>
              <p className="section-copy">
                Update naming and description details without leaving the admin
                workspace.
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
                value={department.dep_name}
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
                value={department.description}
                placeholder="Description"
                className="field-input form-textarea mt-2 block w-full"
                rows="4"
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button w-full sm:w-auto">
                Save Department
              </button>
            </div>
          </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
