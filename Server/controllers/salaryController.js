const Salary = require("../models/Salary.js");
const Employee = require("../models/Employee.js");

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const safeBasicSalary = Number(basicSalary) || 0;
    const safeAllowances = Number(allowances) || 0;
    const safeDeductions = Number(deductions) || 0;
    const totalsalary = safeBasicSalary + safeAllowances - safeDeductions;

    const newSalary = new Salary({
      employeeId,
      basicSalary: safeBasicSalary,
      allowances: safeAllowances,
      deductions: safeDeductions,
      netSalary: totalsalary,
      payDate,
    });
    await newSalary.save();
    return res.status(200).json({ success: true, message: "Salary Updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "add salary server error!" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary = await Salary.find({ employeeId: id }).populate(
      "employeeId",
      "employeeId"
    );
    if (!salary || salary.length < 1) {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, error: "Employee not found" });
      }

      salary = await Salary.find({ employeeId: employee._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get salary server error!" });
  }
};

module.exports = { addSalary, getSalary };
