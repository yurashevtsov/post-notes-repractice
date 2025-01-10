"use strict";

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

module.exports = Object.freeze({
  /** @type {string} */
  nodeEnv: process.env.NODE_ENV || "development",
  /** @type {number} */
  serverPort: Number.parseInt(process.env.SERVER_PORT) || 3000,
});