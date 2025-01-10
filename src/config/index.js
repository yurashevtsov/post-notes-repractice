"use strict";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

module.exports = Object.freeze({
  /** @type {string} */
  nodeEnv: process.env.NODE_ENV || "development",
  /** @type {number} */
  serverPort: Number.parseInt(process.env.SERVER_PORT) || 3000,
  /** @type {string} */
  dbName: process.env.DATABASE_NAME || "post_notes_repractice",
  /** @type {string} */
  dbUser: process.env.DATABASE_USER || "root",
  /** @type {string} */
  dbPassword: process.env.DATABASE_PASSWORD || "",
  /** @type {number} */
  dbPort: Number.parseInt(process.env.DATABASE_PORT) || 3306,
  /** @type {string} */
  dbHost: process.env.DATABASE_HOST || "localhost",
  /** @type {string} */
  dbDialect: process.env.DATABASE_DIALECT || "mysql",
});
