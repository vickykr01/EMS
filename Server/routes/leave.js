const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const allowRoles = require("../middleware/roleMiddleware.js");
const {
  addLeave,
  getLeave,
  getLeaves,
  updateLeaveStatus,
} = require("../controllers/leaveController.js");

router.post("/add", authMiddleware, addLeave);
router.get("/", authMiddleware, getLeaves);
router.put("/:id/status", authMiddleware, allowRoles("admin"), updateLeaveStatus);
router.get("/:id", authMiddleware, getLeave);

module.exports = router;
