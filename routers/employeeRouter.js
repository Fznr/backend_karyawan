import express from "express";
import {
  fetchAttendanceSummary,
  postAttendance,
  getEmployeeById,
  updateEmployeeData,
  getAllAttendancesFilterByDate,
  login,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/:id/attendance-summary", fetchAttendanceSummary);

router.post("/attendance", postAttendance);

router.get("/employees/:id", getEmployeeById);

router.put("/employees/:id", updateEmployeeData);

router.get("/attendances", getAllAttendancesFilterByDate);

router.post("/login", login);
export default router;
