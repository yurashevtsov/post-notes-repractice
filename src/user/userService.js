"use strict";

const User = require("@src/user/userModel.js");
const helpers = require("@src/utils/helpers.js");

async function getAllUsers() {
  const users = await User.findAll();

  return users;
}
async function getUserById(id) {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw new Error(`Not found.`);
  }

  return user;
}

// we dont want to leak any information about the user, no error handlers here
async function getUserByEmailWithPassword(email) {
  const user = await User.scope("withPassword").findOne({
    where: { email },
  });

  return user;
}

async function createUser(dataObj) {
  const newUser = await User.create(dataObj.userData, {
    fields: dataObj.allowedFields,
  });

  return newUser;
}

async function updateUser(dataObj) {
  const foundUser = await User.findOne({
    where: { id: dataObj.id },
  });

  // TODO: add real error handling later
  if (!foundUser) {
    throw new Error(`Not found.`);
  }

  // FILTERING OUT FIELDS THAT WE DONT WANT TO ADD TO A DATABASE
  const filteredObj = helpers.filterUnwantedFields(
    dataObj.userData,
    dataObj.allowedFields
  );

  foundUser.set(filteredObj);

  // funny enough, if I have {fields: "password"} and wont provide this password field, I will get an error, LOL
  await foundUser.save();

  return foundUser;
}

async function deleteUserById(id) {
  const foundUser = await getUserById(id);

  // not throwing error if not found because other function would do it
  await foundUser.destroy();

  return null;
}

module.exports = {
  getUserByEmailWithPassword,
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
};
