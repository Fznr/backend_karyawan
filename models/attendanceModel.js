import { Sequelize } from "sequelize";
import db from "../config/db.js"
import Employee from "./employeeModel.js";

const {DataTypes} = Sequelize;

const Attendance = db.define('Attendance', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },  
      arrivalDate: {
        type: DataTypes.DATEONLY
      },
      arrivalTime: {
        type: DataTypes.TIME
      },
      arrivalStatus: {
        type: DataTypes.ENUM('Masuk', 'Pulang'),
        allowNull: false
      },
      departureDate: {
        type: DataTypes.DATEONLY
      },
      departureTime: {
        type: DataTypes.TIME
      },
}, {freezeTableName: true
});

Attendance.belongsTo(Employee);

export default Attendance;

(async () => {
    await db.sync();
})();