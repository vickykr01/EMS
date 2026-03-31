import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      alert(error.response?.data?.error || error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchSalaries();
  }, [fetchSalaries]);

  const filterSalaries = (q) => {
    if (!q) {
      setFilteredSalaries(salaries);
      return;
    }

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId?.employeeId?.toLowerCase().includes(q.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="dashboard-content">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Salary History</p>
              <h2 className="section-title">Salary records</h2>
              <p className="section-copy">
                Browse payroll history with cleaner spacing and clearer totals.
              </p>
            </div>
          </div>

          <div className="toolbar-shell">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="search-input"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <div className="glass-panel table-shell overflow-hidden">
              <table className="table-lite">
                <thead>
                  <tr>
                    <th className="px-6 py-3">SNO</th>
                    <th className="px-6 py-3">Emp Id</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Allowance</th>
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr key={salary._id}>
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId?.employeeId || "N/A"}
                      </td>
                      <td className="px-6 py-3">{salary.basicSalary}</td>
                      <td className="px-6 py-3">{salary.allowances}</td>
                      <td className="px-6 py-3">{salary.deductions}</td>
                      <td className="px-6 py-3">{salary.netSalary}</td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
