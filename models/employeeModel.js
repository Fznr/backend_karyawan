import { Sequelize } from "sequelize";
import db from "../config/db.js";

const {DataTypes} = Sequelize;

const Employee = db.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },  
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo: {
        type: DataTypes.BLOB
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
}, {freezeTableName: true
});

export default Employee;

(async () => {
    await db.sync();
})();