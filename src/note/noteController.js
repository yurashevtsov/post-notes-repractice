"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const noteService = require("@src/note/noteService.js");

async function getAllNotes(req, res) {
  res.status(200).send(await noteService.getAllNotes());
}

async function getOneNote(req, res) {
  res.status(200).send(await noteService.getNoteById(req.params.id));
}

async function createNote(req, res) {
  const options = {
    userData: req.body,
    allowedFields: ["name", "color", "description"],
  };

  res.status(201).send(await noteService.createNote(options));
}

async function updateNote(req, res) {
  const options = {
    id: req.params.id,
    userData: req.body,
    allowedFields: ["name", "color", "description"],
  };

  res.status(200).send(await noteService.updateNote(options));
}

async function deleteNote(req, res) {
  res.status(204).send(await noteService.deleteNoteById(req.params.id));
}

module.exports = {
  getAllNotes: catchAsync(getAllNotes),
  getOneNote: catchAsync(getOneNote),
  createNote: catchAsync(createNote),
  updateNote: catchAsync(updateNote),
  deleteNote: catchAsync(deleteNote),
};
