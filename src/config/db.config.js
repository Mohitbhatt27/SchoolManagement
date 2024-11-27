const { Sequelize } = require("sequelize");

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_URL,
  DB_PORT,
} = require("../config/server.config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URL,
  dialect: "mysql",
  port: DB_PORT,
});

module.exports = sequelize;
