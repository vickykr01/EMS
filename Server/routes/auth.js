const express = require("express");
const {
  login,
  verify,
  signup,
  adminCreateUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Employee
router.post("/signup", signup);
router.post("/login", login);

// Admin only
router.post(
  "/create-user",
  authMiddleware,
  allowRoles("admin"),
  adminCreateUser,
);

// Verify token
router.get("/verify", authMiddleware, verify);

module.exports = router;
