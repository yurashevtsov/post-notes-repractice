"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const userService = require("./userService.js");
const jwtService = require("@src/auth/jwtService.js");

async function signup(req, res) {
  // allowed fields: username, email, password, avatar - handled by Joi middleware
  const newUser = await userService.createUser(req.body);
  const token = jwtService.encodeToken(newUser.id);

  // could remove the user but not really necessary in my pet project
  res.status(201).send({
    user: newUser,
    token,
  });
}

async function login(req, res) {
  const { user, token } = await userService.authenticateUser(
    req.body.email,
    req.body.password
  );

  res.status(200).send({
    user,
    token,
  });
}

async function getAllUsers(req, res) {
  res.status(200).send(await userService.getAllUsers());
}

async function getOneUser(req, res) {
  res.status(200).send(await userService.getUserById(req.params.id));
}

async function createUser(req, res) {
  res.status(201).send(await userService.createUser(req.body));
}

// changing email is not allowed
async function updateUser(req, res) {
  const userId = req.params.id;
  const userData = req.body;

  res.status(200).send(await userService.updateUser(userId, userData));
}

async function deleteUser(req, res) {
  res.status(204).send(await userService.deleteUserById(req.params.id));
}

module.exports = {
  signup: catchAsync(signup),
  login: catchAsync(login),
  getAllUsers: catchAsync(getAllUsers),
  getOneUser: catchAsync(getOneUser),
  createUser: catchAsync(createUser),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
