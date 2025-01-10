"use strict";

const User = require("@src/user/userModel.js");

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

async function getUserByEmailWithPassword(email) {
  const user = await User.scope("withPassword").findOne({
    where: { email },
  });

  if (!user) {
    throw new Error(`Not found.`);
  }

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

  foundUser.set(dataObj.userData);

  await foundUser.save({
    fields: dataObj.allowedFields,
  });

  // if I wont then it will show desired fields updated but it wont be in database
  // if using validator that will throw an error if not allowed field exists, I wont need to do an extra query or delete these unwanted fields
  await foundUser.reload();

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
