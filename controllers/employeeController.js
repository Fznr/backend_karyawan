import { getAttendanceSummary, postAttendanceService, getEmployeeByIdService, updateEmployeeDataService, getAllAttendancesFilterByDateService, loginService } from '../services/employeeService.js';

const fetchAttendanceSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const attendanceSummary = await getAttendanceSummary(id, startDate, endDate);

    res.json(attendanceSummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function postAttendance(req, res, next) {
  const { employeeId, arrivalDate, arrivalTime, arrivalStatus, departureDate, departureTime } = req.body;
  try {
      const attendance = await postAttendanceService(employeeId, arrivalDate, arrivalTime, arrivalStatus, departureDate, departureTime);
      res.status(201).json({ success: true, message: 'Attendance created successfully', data: attendance });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create attendance', error: error.message });
  }
}

async function getEmployeeById(req, res, next) {
  const employeeId = req.params.id;
  try {
      const employee = await getEmployeeByIdService(employeeId);
      res.status(200).json({ success: true, message: 'Employee fetched successfully', data: employee });
  } catch (error) {
      res.status(404).json({ success: false, message: error.message });
  }
}

async function updateEmployeeData(req, res, next) {
  const employeeId = req.params.id;
  const { oldPassword, ...newData } = req.body;
  try {
    const updatedEmployee = await updateEmployeeDataService(employeeId, oldPassword, newData);
      res.status(200).json({ success: true, message: 'Employee data updated successfully', data: updatedEmployee });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
}

async function getAllAttendancesFilterByDate(req, res, next) {
  try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const employeeId = req.query.employeeId ? req.query.employeeId : '';
      console.log(employeeId, 'halooo');
      const attendances = await getAllAttendancesFilterByDateService(startDate, endDate, employeeId);
      res.status(200).json({ success: true, message: 'Attendances fetched successfully', data: attendances });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch attendances', error: error.message });
  }
}

async function login(req, res) {
  try {
      const { email, password } = req.body;
      const employee = await loginService(email, password);
      res.status(200).json({ success: true, data: employee });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}
export { fetchAttendanceSummary, postAttendance,  getEmployeeById, updateEmployeeData, getAllAttendancesFilterByDate, login};