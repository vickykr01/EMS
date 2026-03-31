import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    martialStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-server-i55t.onrender.com/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            martialStatus: employee.martialStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department?._id || employee.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchemployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://ems-server-i55t.onrender.com/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="dashboard-content">
          <div className="glass-panel form-shell fade-up">
            <div className="mb-8">
              <p className="section-eyebrow">Employees</p>
              <h2 className="section-title">Edit employee</h2>
              <p className="section-copy">
                Refine employee details with a clearer editing workspace.
              </p>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* {name} */}
              <div>
                <label className="field-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>

              {/* {Martial Status} */}
              <div>
                <label className="field-label">Marital Status</label>
                <select
                  name="martialStatus"
                  onChange={handleChange}
                  value={employee.martialStatus}
                  placeholder="Martial Status"
                  className="field-input mt-2 block w-full"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="married">Married</option>
                  <option value="single">Single</option>
                </select>
              </div>
              {/* {Designation} */}
              <div>
                <label className="field-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  placeholder="Designation"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>

              {/* {Salary} */}
              <div>
                <label className="field-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Salary"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>

              {/* {Department} */}
              <div>
                <label className="field-label">Department</label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={employee.department}
                  className="field-input mt-2 block w-full"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button className="primary-button w-full sm:w-auto">
                Save Employee
              </button>
            </div>
          </form>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;
