"use strict";

const routerInstance = require("express").Router();
const noteController = require("./noteController.js");
const authorizationMiddleware = require("@src/auth/authorization.middleware.js");
const joiMiddleware = require("@src/middleware/joiMiddleware.js");
const noteSchema = require("@src/note/noteValidationSchema.js");

routerInstance.use(authorizationMiddleware.tokenAuthHandler);

routerInstance.param(
  "id",
  joiMiddleware.validateSchema(noteSchema.validateIdSchema, "params")
);

// ! ADD JOI VALIDATION FOR ALL ROUTES
// ! USERS ROUTES TOO

// GET ALL NOTES
routerInstance.get(
  "/",
  joiMiddleware.validateMutateQuery(noteSchema.querySchema),
  noteController.getAllUserNotes
);
// GET 1 note by id
routerInstance.get("/:id", noteController.getUserNote);

// CREATE NOTE
routerInstance.post("/",
  joiMiddleware.validateSchema(noteSchema.createNoteSchema),
  noteController.createUserNote);
// UPDATE NOTE
routerInstance.put(
  "/:id",
  joiMiddleware.validateSchema(noteSchema.updateNoteSchema),
  noteController.updateUserNote
);
// DELETE NOTE
routerInstance.delete("/:id", noteController.deleteUserNote);

module.exports = routerInstance;
