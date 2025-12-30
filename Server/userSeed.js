const User = require("./models/User.js");
const bcrypt = require("bcrypt");
const connectDatabase = require("./DB/db.js");

const userRegister = async () => {
  connectDatabase();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();

module.exports = userRegister;
