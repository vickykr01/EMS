const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("user not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("wrong password!");
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: "10d" }
    );
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
module.exports = { login, verify };
