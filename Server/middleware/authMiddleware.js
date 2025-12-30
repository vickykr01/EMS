const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decoded) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    // MUST await
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // attach verified user to req
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = verifyUser;
