"use strict";

const catchAsync = require("@src/utils/catchAsync.js");

const noteService = require("@src/note/noteService.js");

async function getAllNotes(req, res, next) {
  res.status(200).send("Hello from notes!");
}

async function getOneNote(req, res, next) {
  res.status(200).send("Hello from notes!");
}

async function createNote(req, res, next) {
  res.status(201).send("Hello from notes!");
}

async function updateNote(req, res, next) {
  res.status(200).send("Hello from notes!");
}

async function deleteNote(req, res, next) {
  res.status(204).send("Hello from notes!");
}

module.exports = {
  getAllNotes: catchAsync(getAllNotes),
  getOneNote: catchAsync(getOneNote),
  createNote: catchAsync(createNote),
  updateNote: catchAsync(updateNote),
  deleteNote: catchAsync(deleteNote),
};
