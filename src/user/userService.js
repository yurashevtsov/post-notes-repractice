"use strict";

const User = require("@src/user/userModel.js");

async function getAllUsers() {
  const users = await User.findAll();

  return users;
}
async function getUserById(dataObj) {
  const user = await User.findOne({
    where: { id: dataObj.id },
  });

  if (!user) {
    throw new Error(`No user found with that id: ${dataObj.id}`);
  }

  return user;
}

async function createUser(dataObj) {
  const newUser = await User.create(dataObj.userData, {
    fields: dataObj.allowedFields,
  });

  return newUser;
}

async function updateUserById(dataObj) {
  const foundUser = await User.findOne({
    where: { id: dataObj.id },
  });

  // TODO: add real error handling later
  if (!foundUser) {
    throw new Error(`No user found with that id: ${dataObj.id}`);
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

async function deleteUserById(dataObj) {
  const foundUser = await User.findOne({
    where: { id: dataObj.id },
  });

  if (!foundUser) {
    throw new Error(`No user found with that id: ${dataObj.id}`);
  }

  await User.destroy({
    where: { id: dataObj.id },
  });

  return null;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
