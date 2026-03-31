import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
  },

  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
  },

  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `https://ems-server-i55t.onrender.com/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
        // setDepartment(data);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="action-button action-button-edit"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </button>
      <button
        className="action-button action-button-delete"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
