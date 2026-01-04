const path = require("path");
const Employee = require("../models/Employee");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Department = require("../models/Department");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      martialStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    if (!employeeId || !department || !salary || !password) {
      return res.status(400).json({
        success: false,
        error: "Required fields missing",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: "User already registered as Employee",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      martialStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " Employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, martialStatus, salary, department, designation } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(500)
        .json({ success: false, error: " employee not found!" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: " user not found!" });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        martialStatus,
        designation,
        salary,
        department,
      }
    );
    if (!updateUser || !updateEmployee) {
      return res
        .status(500)
        .json({ success: false, error: " Document not found!" });
    }
    return res
      .status(200)
      .json({ success: true, message: " Employee updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " Edit Employee server error" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: " EmployeesByDepId server error" });
  }
};

module.exports = {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
};
