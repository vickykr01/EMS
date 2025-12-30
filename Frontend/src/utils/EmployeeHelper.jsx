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
    center: "true",
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
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

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1">
      <button
        className="px-1 py-1 bg-teal-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>
      <button
        className="px-1 py-1 bg-blue-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>
      <button className="px-1 py-1 bg-yellow-600 text-white"> Salary </button>
      <button className="px-1 py-1 bg-red-600 text-white">Leave</button>
    </div>
  );
};
