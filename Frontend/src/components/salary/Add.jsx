import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/salary/add`,
        salary,
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
      {departments ? (
        <div className="dashboard-content">
          <div className="glass-panel form-shell fade-up">
            <div className="mb-8">
              <p className="section-eyebrow">Salary Desk</p>
              <h2 className="section-title">Add salary</h2>
              <p className="section-copy">
                Assign salary records through a cleaner, more structured payroll
                form.
              </p>
            </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* {Department} */}
              <div>
                <label className="field-label">Department</label>
                <select
                  name="department"
                  onChange={handleDepartment}
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

              {/* {Employee} */}
              <div>
                <label className="field-label">Employees</label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="field-input mt-2 block w-full"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* {Basic salary} */}
              <div>
                <label className="field-label">Basic salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  placeholder="Basic salary"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>

              {/* {Allowances} */}
              <div>
                <label className="field-label">Allowances</label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  placeholder="Allowances"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>
              {/* {Deductions} */}
              <div>
                <label className="field-label">Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  placeholder="Deductions"
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>
              {/* {Pay Date} */}
              <div>
                <label className="field-label">Pay Date</label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="field-input mt-2 block w-full"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="primary-button w-full sm:w-auto">
                Add Salary
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

export default Add;
