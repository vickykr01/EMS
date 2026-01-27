const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Leave = require("../models/Leave");

const router = express.Router();

router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const leaveApplied = await Leave.countDocuments();
    const leaveApproved = await Leave.countDocuments({ status: "Approved" });
    const leavePending = await Leave.countDocuments({ status: "Pending" });
    const leaveRejected = await Leave.countDocuments({ status: "Rejected" });

    res.status(200).json({
      totalEmployees,
      totalDepartments,
      monthlySalary: 0, //  calculate later
      leaveApplied,
      leaveApproved,
      leavePending,
      leaveRejected,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
});

module.exports = router;
