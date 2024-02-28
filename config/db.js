import { Sequelize } from "sequelize";

const db = new Sequelize("postgres", "20058967", "*****", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
