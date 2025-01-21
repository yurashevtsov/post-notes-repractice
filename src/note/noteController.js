"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const noteService = require("@src/note/noteService.js");

// user must be authenticated to use these

async function getAllUserNotes(req, res) {
  res
    .status(200)
    .send(await noteService.getAllUserNotes(req.user.id, req.query));
}

async function getUserNote(req, res) {
  const userId = req.user.id; 
  const noteId = req.params.id;

  res.status(200).send(await noteService.getUserNote(userId, noteId));
}

async function createUserNote(req, res) {
  const userId = req.user.id;
  const userData = req.body;

  res.status(201).send(await noteService.createUserNote(userId, userData));
}

async function updateUserNote(req, res) {
  const userId = req.user.id;
  const noteId = req.params.id;

  res
    .status(200)
    .send(await noteService.updateUserNote(userId, noteId, req.body));
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
