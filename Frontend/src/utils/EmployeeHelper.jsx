import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70",
  },

  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    width: "560px",
    center: true,
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("https://ems-server-i55t.onrender.com/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

// Employees for salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `https://ems-server-i55t.onrender.com/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ id, onEmployeeDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "This will permanently remove the employee, user account, leave history, and salary records. Continue?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        onEmployeeDelete?.(id);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Failed to remove employee");
    }
  };

  return (
    <div className="employee-action-grid">
      <button
        className="action-button action-button-view"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>
      <button
        className="action-button action-button-edit"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="action-button action-button-warn"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
      >
        Salary
      </button>
      <button
        className="action-button action-button-delete"
        onClick={() => navigate(`/admin-dashboard/leaves?employeeId=${id}`)}
      >
        Leave
      </button>
      <button
        className="action-button action-button-delete"
        onClick={handleDelete}
      >
        Remove
      </button>
    </div>
  );
};
