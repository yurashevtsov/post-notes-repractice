"use strict";

const Note = require("@src/note/noteModel.js");

async function getAllUserNotes(userId, queryObj) {
  const queryDB = {
    where: { userId: userId },
  };

  // LIMITING FIELDS - however, not excluding fields
  if (queryObj.fields) {
    if (Array.isArray(queryObj.fields)) {
      queryDB.attributes = queryObj.fields;
    } else {
      queryDB.attributes = queryObj.fields
        .split(",")
        .map((field) => field.trim());
    }
  }

  // SORTING
  if (queryObj.order) {
    queryDB.order = [];
    // IF multiple instances of order=name_asc&order=description_desc - it becomes an array
    // therefore each element must be split by underscore and pushed into REAL query order array
    // if its not an array - then only 1 element is present, which we split by underscore and push into order array
    if (Array.isArray(queryObj.order)) {
      queryObj.order.forEach((el) => queryDB.order.push(el.split("_")));
    } else {
      queryDB.order.push(queryObj.order.split("_"));
    }
  }

  // PAGINATION 
  // PAGE - default 1
  queryDB.page = Number.parseInt(queryObj.page) || 1;
  // HOW MANY RESULTS SHOULD BE SHOWN
  queryDB.limit = Number.parseInt(queryObj.limit) || 1000;
  // HOW MANY RECORDS SHOULD BE SKIPPED
  queryDB.offset = (queryDB.limit - 1) * queryObj.limit;

  const allNotes = await Note.findAll(queryDB);

  // const allNotes = await Note.findAll({
  //   where: {
  //     userId: userId,
  //   },
  //   limit: queryObj.limit,
  //   offset: (queryObj.page - 1) * queryObj.limit,
  //   order: [[queryObj.sortBy, queryObj.sortDirection]],
  // });

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
