import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files?.[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(); // Dynamical method to obtain the form data value
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "https://ems-server-i55t.onrender.com/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
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
    <div className="dashboard-content">
      <div className="glass-panel form-shell fade-up">
        <div className="mb-8">
          <p className="section-eyebrow">Employees</p>
          <h2 className="section-title">Add new employee</h2>
          <p className="section-copy">
            Build complete employee records with profile, department, payroll,
            and access details in one form.
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
              onChange={handleChange}
              placeholder="Insert Name"
              className="field-input mt-2 block w-full"
              required
            />
          </div>

          {/* {email} */}
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              className="field-input mt-2 block w-full"
              required
            />
          </div>
          {/* {Employee ID} */}
          <div>
            <label className="field-label">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              className="field-input mt-2 block w-full"
              required
            />
          </div>
          {/* {Date of Birth} */}
          <div>
            <label className="field-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              placeholder="DOB"
              className="field-input mt-2 block w-full"
              required
            />
          </div>
          {/* {Gender} */}
          <div>
            <label className="field-label">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="field-input mt-2 block w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* {Martial Status} */}
          <div>
            <label className="field-label">Marital Status</label>
            <select
              name="martialStatus"
              onChange={handleChange}
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
              placeholder="Designation"
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
          {/* {Salary} */}
          <div>
            <label className="field-label">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              className="field-input mt-2 block w-full"
              required
            />
          </div>
          {/* {Password} */}
          <div>
            <label className="field-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="******"
              className="field-input mt-2 block w-full"
              required
            />
          </div>
          {/* {Role} */}
          <div>
            <label className="field-label">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="field-input mt-2 block w-full"
              required
            >
              <option value="employee">Employee</option>
            </select>
          </div>
          {/* {Image Upload} */}
          <div>
            <label className="field-label">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              placeholder=" Upload Image"
              accept="image/*"
              className="field-input mt-2 block w-full"
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="primary-button w-full sm:w-auto">
            Add Employee
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Add;
