import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import { tableStyles } from "../../utils/tableStyles.js";
import DataTable from "react-data-table-component";
import axios from "axios";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  const onEmployeeDelete = (id) => {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee._id !== id),
    );
    setFilteredEmployee((currentEmployees) =>
      currentEmployees.filter((employee) => employee._id !== id),
    );
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "Unassigned",
            name: emp.userId?.name || "Unknown Employee",
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
            martialStatus: emp.martialStatus,
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:3000/${emp.userId?.profileImage || ""}`}
                alt={emp.userId?.name || "Employee"}
              />
            ),
            action: (
              <EmployeeButtons id={emp._id} onEmployeeDelete={onEmployeeDelete} />
            ),
          }));
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployee(records);
  };
  return (
    <div className="dashboard-content">
      <div className="section-header">
        <div>
          <p className="section-eyebrow">Employees</p>
          <h3 className="section-title">Manage employees</h3>
          <p className="section-copy">
            Browse your workforce, search quickly, and jump into profile,
            salary, or edit flows from one polished list.
          </p>
        </div>
      </div>
      {empLoading && <div className="mt-4">Loading...</div>}
      <div className="toolbar-shell">
        <input
          type="text"
          placeholder="Search by employee name"
          className="search-input"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="primary-button"
        >
          Add New Employees
        </Link>
      </div>
      <div className="glass-panel table-shell mt-5 overflow-hidden p-2">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          customStyles={tableStyles}
        />
      </div>
    </div>
  );
};

export default List;
