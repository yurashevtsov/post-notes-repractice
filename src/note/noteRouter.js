"use strict";

const routerInstance = require("express").Router();
const noteController = require("./noteController.js");
const authorizationMiddleware = require("@src/auth/authorization.middleware.js");

routerInstance.use(authorizationMiddleware.tokenAuthHandler);

routerInstance.get("/", noteController.getAllUserNotes);
routerInstance.get("/:id", noteController.getUserNote);
routerInstance.post("/", noteController.createUserNote);
routerInstance.put("/:id", noteController.updateUserNote);
routerInstance.delete("/:id", noteController.deleteUserNote);

module.exports = routerInstance;
