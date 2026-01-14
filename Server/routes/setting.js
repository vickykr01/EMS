const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");
const changePassword = require("../controllers/settingController.js");

router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
