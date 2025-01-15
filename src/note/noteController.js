"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const noteService = require("@src/note/noteService.js");

async function getAllUserNotes(req, res) {
  res.status(200).send(await noteService.getAllUserNotes());
}

async function getUserNote(req, res) {
  res.status(200).send(await noteService.getUserNote(req.params.id));
}

async function createUserNote(req, res) {
  const options = {
    userData: req.body,
    allowedFields: ["name", "color", "description"],
  };

  res.status(201).send(await noteService.createUserNote(options));
}

async function updateUserNote(req, res) {
  const options = {
    id: req.params.id,
    userData: req.body,
    allowedFields: ["name", "color", "description"],
  };

  res.status(200).send(await noteService.updateUserNote(options));
}

async function deleteUserNote(req, res) {
  res.status(204).send(await noteService.deleteUserNote(req.params.id));
}

module.exports = {
  getAllUserNotes: catchAsync(getAllUserNotes),
  getUserNote: catchAsync(getUserNote),
  createUserNote: catchAsync(createUserNote),
  updateUserNote: catchAsync(updateUserNote),
  deleteUserNote: catchAsync(deleteUserNote),
};
