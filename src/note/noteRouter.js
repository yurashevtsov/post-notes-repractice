"use strict";

const routerInstance = require("express").Router();
const noteController = require("./noteController.js");
const authorizationMiddleware = require("@src/auth/authorization.middleware.js");
const joiMiddleware = require("@src/middleware/joiMiddleware.js");
const noteSchema = require("@src/note/noteValidationSchema.js");

routerInstance.use(authorizationMiddleware.tokenAuthHandler);

// GET ALL NOTES
routerInstance.get(
  "/",
  joiMiddleware.validateMutateQuery(noteSchema.querySchema),
  noteController.getAllUserNotes
);
// GET 1 note by id
routerInstance.get("/:id", noteController.getUserNote);

// CREATE NOTE
routerInstance.post("/", noteController.createUserNote);
// UPDATE NOTE
routerInstance.put("/:id", noteController.updateUserNote);
// DELETE NOTE
routerInstance.delete("/:id", noteController.deleteUserNote);

module.exports = routerInstance;
