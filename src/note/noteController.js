"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const noteService = require("@src/note/noteService.js");
const helpers = require("@src/utils/helpers");

// user must be authenticated to use these

async function getAllUserNotes(req, res) {
  const userId = req.user.id;

  res.status(200).send(await noteService.getAllUserNotes(userId));
}

async function getUserNote(req, res) {
  const userId = req.user.id; // const { userId } = req.user;
  const noteId = req.params.id; // const { id: noteId } = req.params;

  res.status(200).send(await noteService.getUserNote(userId, noteId));
}

async function createUserNote(req, res) {
  const userId = req.user.id;
  const userData = req.body;

  // filter user input
  // I dont want them to modify userId or set their own note id
  // will fix it with joi later
  helpers.removeFieldsFromObj(req.body, ["userId", "id"]);

  res.status(201).send(await noteService.createUserNote(userId, userData));
}

async function updateUserNote(req, res) {
  const userId = req.user.id;
  const userData = req.body;

  helpers.removeFieldsFromObj(req.body, ["userId", "id"]);

  res.status(200).send(await noteService.updateUserNote(userId, userData));
}

async function deleteUserNote(req, res) {
  const userId = req.user.id;
  const noteId = req.params.id;

  res.status(204).send(await noteService.deleteUserNote(userId, noteId));
}

module.exports = {
  getAllUserNotes: catchAsync(getAllUserNotes),
  getUserNote: catchAsync(getUserNote),
  createUserNote: catchAsync(createUserNote),
  updateUserNote: catchAsync(updateUserNote),
  deleteUserNote: catchAsync(deleteUserNote),
};
