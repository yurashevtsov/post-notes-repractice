"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const userService = require("./userService.js");

async function getAllUsers(req, res) {
  res.status(200).send(await userService.getAllUsers());
}

async function getOneUser(req, res) {
  const options = {
    id: req.params.id,
  };

  res.status(200).send(await userService.getUserById(options));
}

// TODO: figure out how to handle dublicates...
async function createUser(req, res) {
  const options = {
    userData: req.body,
    allowedFields: ["username", "email", "password", "avatar"],
  };

  res.status(200).send(await userService.createUser(options));
}

// we wont allow to change password here, i'm slightly concerned it does 3 queries - find user, update user, query user with updated data :D
async function updateUser(req, res) {
  const options = {
    id: req.params.id,
    userData: req.body,
    allowedFields: ["username", "email", "avatar"],
  };

  res.status(200).send(await userService.updateUserById(options));
}

async function deleteUser(req, res) {
  const options = {
    id: req.params.id,
  };

  res.status(204).send(await userService.deleteUserById(options));
}

module.exports = {
  getAllUsers: catchAsync(getAllUsers),
  getOneUser: catchAsync(getOneUser),
  createUser: catchAsync(createUser),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
