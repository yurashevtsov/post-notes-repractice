"use strict";

const routerInstance = require("express").Router();
const userController = require("./userController.js");
const authMiddleware = require("@src/auth/authorization.middleware.js");
const joiMiddleware = require("@src/middleware/joiMiddleware.js");
const userValidationSchema = require("@src/user/userValidationSchema.js");

routerInstance.post(
  "/signup",
  joiMiddleware.validateSchema(userValidationSchema.createUserSchema),
  userController.signup
);

routerInstance.post(
  "/login",
  joiMiddleware.validateSchema(userValidationSchema.loginSchema),
  userController.login
);

// AUTHORIZATION MIDDLEWARE
// APPLIES TO ALL ROUTES BELOW
routerInstance.use(authMiddleware.tokenAuthHandler);

routerInstance.get("/", userController.getAllUsers);

routerInstance.get("/:id", userController.getOneUser);

routerInstance.post(
  "/",
  joiMiddleware.validateSchema(userValidationSchema.createUserSchema),
  userController.createUser
);

routerInstance.put("/:id",
	joiMiddleware.validateSchema(userValidationSchema.updateUserSchema),
	userController.updateUser);

routerInstance.delete("/:id", userController.deleteUser);

module.exports = routerInstance;
