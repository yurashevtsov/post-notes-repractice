"use strict";

const routerInstance = require("express").Router();
const userController = require("./userController.js");

routerInstance.post("/signup", userController.signup);
routerInstance.post("/login", userController.login);

routerInstance.get("/", userController.getAllUsers);
routerInstance.get("/:id", userController.getOneUser);
routerInstance.post("/", userController.createUser);
routerInstance.put("/:id", userController.updateUser);
routerInstance.delete("/:id", userController.deleteUser);

module.exports = routerInstance;
