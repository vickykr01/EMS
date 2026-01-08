const express = require("express");
const { addSalary, getSalary } = require("../controllers/salaryController.js");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/add", authMiddleware, addSalary);
router.get("/:id", authMiddleware, getSalary);

module.exports = router;
