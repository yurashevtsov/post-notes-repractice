"use strict";

const Note = require("@src/note/noteModel.js");
const AppFeatures = require("@src/utils/appFeatures");
const { HttpNotFoundError } = require("@src/utils/httpErrors");

/* 
  accepts - fields: id, userId, name, description, color, createdAt, updatedAt
  query example - api/notes?order=id_desc,name&page=1&limit=2&fields=id,userId,name,description
  for sort - order=field_direction
*/
async function getAllUserNotes(userId, queryObj) {
  const initCondition = {
    where: { userId: userId },
  };

  const { databaseQuery } = new AppFeatures(initCondition, queryObj)
    .sort()
    .limitFields()
    .paginate();

  const data = await Note.findAndCountAll(databaseQuery);

  return {
    total: data.count,
    totalPages: Math.ceil(data.count / databaseQuery.limit),
    currentPage: databaseQuery.page,
    data: data.rows,
  };
}

async function getUserNote(userId, noteId) {
  const foundNote = await Note.findOne({
    where: {
      userId: userId,
      id: noteId,
    },
  });

  if (!foundNote) {
    throw new HttpNotFoundError(`Note with id ${noteId} is not found.`);
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
    throw new HttpNotFoundError(`Note with id ${noteId} is not found.`);
  }

  foundNote.set(userData);

  await foundNote.save();

  return foundNote;
}

async function deleteUserNote(userId, noteId) {
  const foundNote = await getUserNote(userId, noteId);

  if (!foundNote) {
    throw new HttpNotFoundError(`Note with id ${noteId} is not found.`);
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
