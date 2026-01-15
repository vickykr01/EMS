const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const {
  addLeave,
  getLeave,
  getLeaves,
} = require("../controllers/leaveController.js");

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeave);
router.get("/", authMiddleware, getLeaves);

module.exports = router;
