"use strict";

const Note = require("@src/note/noteModel.js");

async function getAllNotes() {
  const allNotes = await Note.findAll();

  return allNotes;
}

async function getNoteById(id) {
  const foundNote = await Note.findOne({
    where: { id },
  });

  if (!foundNote) {
    throw new Error(`Not found.`);
  }

  return foundNote;
}

async function createNote(dataObj) {
  const newNote = await Note.create(dataObj.userData, {
    fields: dataObj.allowedFields,
  });

  return newNote;
}

async function updateNote(dataObj) {
  const foundNote = await Note.findOne({
    id: dataObj.id,
  });

  if (!foundNote) {
    throw new Error(`Not found.`);
  }

  foundNote.set(dataObj.userData);

  await foundNote.save({
    fields: dataObj.allowedFields,
  });

  return foundNote;
}

async function deleteNoteById(id) {
    const foundNote = await getNoteById(id);

    foundNote.destroy();

    return null;
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNoteById,
};
