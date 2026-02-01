import React, { useEffect, useState } from "react";
import { LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);

  const fetchLeave = async () => {
    try {
      const response = await axios.get("https://ems-server-i55t.onrender.com/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;

        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          department: leave.employeeId.department.dep_name,
          leaveType: leave.leaveType,
          days:
            (new Date(leave.endDate) - new Date(leave.startDate)) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status,
          action: <LeaveButtons id={leave._id} />,
        }));

        setLeaves(data);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Server error");
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  if (!leaves) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />

        <div className="space-x-3">
          <button className="px-2 py-1 bg-teal-600 text-white">Pending</button>
          <button className="px-2 py-1 bg-teal-600 text-white">Approved</button>
          <button className="px-2 py-1 bg-teal-600 text-white">Rejected</button>
        </div>
      </div>

      <DataTable columns={columns} data={leaves} pagination />
    </div>
  );
};

export default Table;
