import Attendance from '../models/attendanceModel.js';
import { Op } from 'sequelize';
import Employee from '../models/employeeModel.js';

const getAttendanceSummary = async (employeeId, startDate, endDate) => {
  try {
    if (!startDate) {
      const today = new Date();
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    if (!endDate) {
      endDate = new Date();
    }

    const attendanceSummary = await Attendance.findAll({
      include: {
        model: Employee,
        attributes: ['name', 'email']
      },
      where: {
        EmployeeId: employeeId,
        arrivalDate: {
          [Op.between]: [startDate, endDate]
        },
        departureDate: {
          [Op.between]: [startDate, endDate]
        }
      }
    });

    return attendanceSummary;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function postAttendanceService(employeeId, arrivalDate, arrivalTime, arrivalStatus, departureDate, departureTime) {
  try {
      const attendance = await Attendance.create({
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        arrivalStatus: arrivalStatus,
        departureDate: departureDate,
        departureTime: departureTime,
        EmployeeId: employeeId,
      });
      return attendance;
  } catch (error) {
      throw new Error(error);
  }
}

async function getEmployeeByIdService(employeeId) {
  try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
          throw new Error('Employee not found');
      }
      return employee;
  } catch (error) {
      throw new Error('Failed to fetch employee');
  }
}

async function updateEmployeeDataService(employeeId, oldPassword, newData) {
  try {
      const employee = await Employee.findByPk(employeeId);
      if (!employee) {
          throw new Error('Employee not found');
      }
      if (employee.password !== oldPassword) {
          throw new Error('Old password is incorrect');
      }
      await employee.update(newData);
      return employee;
  } catch (error) {
      throw new Error(error.message);
  }
}

async function getAllAttendancesFilterByDateService(startDate, endDate, employeeId) {
  try {
      if (!startDate) {
        const today = new Date();
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      }
      if (!endDate) {
        endDate = new Date();
      }
      const filterOptions = {
        where: {
          arrivalDate: {
            [Op.between]: [startDate, endDate]
          },
          departureDate: {
            [Op.between]: [startDate, endDate]
          }
        }
      }
      if (employeeId != '') {
        filterOptions.where.EmployeeId = employeeId;
      }
      const attendances = await Attendance.findAll(filterOptions, {
        include: {
          model: Employee,
          attributes: ['name', 'email']
        }
      });
      return attendances;
  } catch (error) {
      throw new Error(error);
  }
}
export { getAttendanceSummary, postAttendanceService, getEmployeeByIdService, updateEmployeeDataService, getAllAttendancesFilterByDateService };