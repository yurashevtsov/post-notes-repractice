"use strict";

const config = require("@config/index.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  database: config.dbName,
  port: config.dbPort,
  dialect: config.dbDialect,
});

async function init() {
  try {
    await sequelize.sync({ alter: true });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

module.exports = {
  sequelizeInstance: sequelize,
  init,
};
