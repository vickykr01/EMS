const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const allowRoles = require("../middleware/roleMiddleware.js");
const {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  deleteEmployee,
} = require("../controllers/employeeController.js");
// const getDepartments = require("../controllers/departmentController.js");
// const editDepartment = require("../controllers/departmentController.js");

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("image"), addEmployee);
router.get("/department/:id", authMiddleware, fetchEmployeesByDepId);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, allowRoles("admin"), deleteEmployee);

module.exports = router;
