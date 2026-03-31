import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper.jsx";
import { tableStyles } from "../../utils/tableStyles.js";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartment, setFilteredDepartment] = useState([]);

  const onDepartmentDelete = useCallback((id) => {
    setDepartments((currentDepartments) =>
      currentDepartments.filter((dep) => dep._id !== id),
    );
    setFilteredDepartment((currentDepartments) =>
      currentDepartments.filter((dep) => dep._id !== id),
    );
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (
              <DepartmentButtons
                Id={dep._id}
                onDepartmentDelete={onDepartmentDelete}
              />
            ),
          }));
          setDepartments(data);
          setFilteredDepartment(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, [onDepartmentDelete]);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartment(records);
  };

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-content">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Departments</p>
              <h3 className="section-title">Manage departments</h3>
              <p className="section-copy">
                Organize teams and keep the department structure clean and easy
                to browse.
              </p>
            </div>
          </div>
          <div className="toolbar-shell">
            <input
              type="text"
              placeholder="Search by department name"
              className="search-input"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="primary-button"
            >
              Add New Department
            </Link>
          </div>
          <div className="glass-panel table-shell mt-5 overflow-hidden p-2">
            <DataTable
              columns={columns}
              data={filteredDepartment}
              pagination
              customStyles={tableStyles}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
