"use strict";

const Note = require("@src/note/noteModel.js");
const AppFeatures = require("@src/utils/appFeatures");

/* 
  accepts - fields: id, userId, name, description, color, createdAt, updatedAt
*/
async function getAllUserNotes(userId, queryObj) {
  const initCondition = {
    where: { userId: userId },
  };

  const { databaseQuery } = new AppFeatures(initCondition, queryObj)
    .sort()
    .limitFields()
    .paginate();

  const allNotes = await Note.findAll(databaseQuery);

  return allNotes;
}

// async function getAllUserNotes(userId, queryObj) {
//   console.log(queryObj);

//   const queryDB = {
//     where: { userId: userId },
//     // PAGINATION
//     page: queryObj.page,
//     // HOW MANY RESULTS SHOULD BE SHOWN
//     limit: queryObj.limit,
//     // Sort order
//     order: [],
//     // HOW MANY RECORDS SHOULD BE SKIPPED
//     offset: (queryObj.page - 1) * queryObj.limit,
//   };

//   // LIMITING FIELDS
//   if (queryObj.fields) {
//     // if I get unknown field, it will throw an error, what if I'll use filter to get only known fields before putting it there?
//     queryDB.attributes = queryObj.fields;
//   }

//   // sort order
//   if (queryObj.order) {
//     queryObj.order.map((el) => queryDB.order.push(el.split("_")));
//   }

//   console.log(queryDB);

//   const allNotes = await Note.findAll(queryDB);

//   return allNotes;
// }

async function getUserNote(userId, noteId) {
  const foundNote = await Note.findOne({
    where: {
      userId: userId,
      id: noteId,
    },
  });

  if (!foundNote) {
    throw new Error(`Entity you are trying to find doesnt exists.`);
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
    throw new Error(`Entity you are trying to update doesnt exists.`);
  }

  foundNote.set(userData);

  await foundNote.save();

  return foundNote;
}

async function deleteUserNote(userId, noteId) {
  const foundNote = await getUserNote(userId, noteId);

  if (!foundNote) {
    throw new Error(`Entity you are trying to delete doesnt exists.`);
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
