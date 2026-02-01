const Leave = require("../models/Leave.js");
const Employee = require("../models/Employee.js");
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

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
      reason,
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
    const leaves = await Leave.find().populate({
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

module.exports = { addLeave, getLeave, getLeaves };
