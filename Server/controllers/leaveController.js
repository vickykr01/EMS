const Leave = require("../models/Leave.js");
const Employee = require("../models/Employee.js");

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason?.trim()) {
      return res.status(400).json({
        success: false,
        error: "All leave fields are required",
      });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        error: "End date cannot be before start date",
      });
    }

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: "Leave Added!",
    });
  } catch (error) {
    console.error("ADD LEAVE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error("GET LEAVE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ appliedAt: -1 }).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: " error!" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid leave status",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    ).populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Unable to update leave status",
    });
  }
};

module.exports = { addLeave, getLeave, getLeaves, updateLeaveStatus };
