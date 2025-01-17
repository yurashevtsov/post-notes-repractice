"use strict";

const Note = require("@src/note/noteModel.js");

async function getAllUserNotes(userId) {
  const allNotes = await Note.findAll({
    where: {
      userId: userId,
    },
  });

  return allNotes;
}

async function getUserNote(userId, noteId) {
  const foundNote = await Note.findOne({
    where: {
      userId: userId,
      id: noteId,
    },
  });

  if (!foundNote) {
    throw new Error(`An entity you are trying to find (get) doesnt exists.`);
  }

  return foundNote;
}

async function createUserNote(userId, userData) {
  const newNote = await Note.create({
    userId: userId,
    ...userData,
  });

  return newNote;
}

async function updateUserNote(userId, noteId, userData) {
  const foundNote = await Note.findOne({
    where: {
      id: noteId,
      userId: userId,
    },
  });

  if (!foundNote) {
    throw new Error(`An entity you are trying to update doesnt exists.`);
  }

  foundNote.set(userData);

  await foundNote.save();

  return foundNote;
}

async function deleteUserNote(userId, noteId) {
  const foundNote = await getUserNote(userId, noteId);

  if (!foundNote) {
    throw new Error(`An entity you are trying to delete doesnt exists.`);
  }

  foundNote.destroy();

  return null;
}

module.exports = {
  getAllUserNotes,
  getUserNote,
  createUserNote,
  updateUserNote,
  deleteUserNote,
};
