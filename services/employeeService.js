import Attendance from '../models/attendanceModel.js';
import { Op } from 'sequelize';
import Employee from '../models/employeeModel.js';
import {sendMessage} from '../kafkaConfig/kafkaProducerConfig.js';

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
        attributes: ['name', 'email', 'photo']
      },
      where: {
        EmployeeId: employeeId,
        [Op.and]: [
          {
            arrivalDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            [Op.or]: [
              {
                departureDate: {
                  [Op.between]: [startDate, endDate]
                }
              },
              {
                departureDate: null
              }
            ]
          }
        ]
      }
    });

    return attendanceSummary;
  } catch (error) {
    throw new Error(error.message);
  }
};

async function postAttendanceService(employeeId, arrivalDate, arrivalTime, arrivalStatus, departureDate, departureTime) {
  try {
    let attendance = await Attendance.findOne({
      where: {
        EmployeeId: employeeId,
        arrivalDate: arrivalDate
      }
    });

    if (attendance) {
      console.log('masuk')
      // Jika data absensi sudah ada, lakukan pembaruan
      attendance = await Attendance.update({
        arrivalStatus: arrivalStatus,
        departureDate: departureDate,
        departureTime: departureTime
      }, {
        where: {
          EmployeeId: employeeId,
          arrivalDate: arrivalDate
        }
      });
    } else {
      // Jika data absensi belum ada, buat entri baru
      attendance = await Attendance.create({
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        arrivalStatus: arrivalStatus,
        departureDate: departureDate,
        departureTime: departureTime,
        EmployeeId: employeeId
      });
    }
      return attendance;
  } catch (error) {
     console.log(error)
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
      if (oldPassword && employee.password !== oldPassword) {
          throw new Error('Old password is incorrect');
      }
      await employee.update(newData);
      await sendMessage('data_test', employee.name + " has change their data");
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
        include: {
          model: Employee,
          attributes: ['name', 'email']
        },
        where: {
          [Op.and]: [
            {
              arrivalDate: {
                [Op.between]: [startDate, endDate]
              }
            },
            {
              [Op.or]: [
                {
                  departureDate: {
                    [Op.between]: [startDate, endDate]
                  }
                },
                {
                  departureDate: null
                }
              ]
            }
          ]
        }
      }
      if (employeeId != '') {
        filterOptions.where.EmployeeId = employeeId;
      }
      const attendances = await Attendance.findAll(filterOptions);
      console.log(attendances)
      return attendances;
  } catch (error) {
      throw new Error(error);
  }
}

async function loginService(email, password) {
  try {
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      throw new Error('Employee not found');
    }

    if (employee.password !== password) {
      throw new Error('Invalid password');
    }

    return employee;
  } catch (error) {
    throw new Error(error.message);
  }
}
export { getAttendanceSummary, postAttendanceService, getEmployeeByIdService, updateEmployeeDataService, getAllAttendancesFilterByDateService, loginService };