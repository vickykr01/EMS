const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const { addLeave, getLeaves } = require("../controllers/leaveController.js");

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeaves);

module.exports = router;
