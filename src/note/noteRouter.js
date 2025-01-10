"use strict";

const routerInstance = require("express").Router();
const noteController = require("./noteController.js");

routerInstance.get("/", noteController.getAllNotes);
routerInstance.get("/:id", noteController.getOneNote);
routerInstance.post("/", noteController.createNote);
routerInstance.put("/:id", noteController.updateNote);
routerInstance.delete("/:id", noteController.deleteNote);

module.exports = routerInstance;
