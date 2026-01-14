const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./DB/db.js");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const departmentRouter = require("./routes/department.js");
const employeeRouter = require("./routes/employee.js");
const salaryRouter = require("./routes/salary.js");
const leaveRouter = require("./routes/leave.js");
const settingRouter = require("./routes/setting.js");
const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
