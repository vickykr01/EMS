const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const { addSalary, getSalary } = require("../controllers/salaryController.js");

router.post("/add", authMiddleware, addSalary);
router.get("/:id", authMiddleware, getSalary);

module.exports = router;
