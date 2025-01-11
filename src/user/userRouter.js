"use strict";

const routerInstance = require("express").Router();
const userController = require("./userController.js");
const authMiddleware = require("@src/auth/authorization.middleware.js");

routerInstance.post("/signup", userController.signup);
routerInstance.post("/login", userController.login);

// applies to all routes below
routerInstance.use(authMiddleware.tokenAuthHandler);

routerInstance.get("/", userController.getAllUsers);
routerInstance.get("/:id", userController.getOneUser);
routerInstance.post("/", userController.createUser);
routerInstance.put("/:id", userController.updateUser);
routerInstance.delete("/:id", userController.deleteUser);

module.exports = routerInstance;
