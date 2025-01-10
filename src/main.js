"use strict";

// module for easy aliases
require("module-alias/register");

// config must be required first for everything below to access it
const config = require("@config/index.js");
const app = require("./app.js");

// when database connected, only then listen for requests
app.listen(config.serverPort, () => {
  console.log(`Server is running on port ${config.serverPort}`);
});
