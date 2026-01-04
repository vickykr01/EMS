const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
} = require("../controllers/employeeController.js");
// const getDepartments = require("../controllers/departmentController.js");
// const editDepartment = require("../controllers/departmentController.js");

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);

module.exports = router;
