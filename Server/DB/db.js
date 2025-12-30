const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const db_url = process.env.MONGODB_URL;

const connectDatabase = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDatabase;
