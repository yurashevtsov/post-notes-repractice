"use strict";

const catchAsync = require("@src/utils/catchAsync.js");
const userService = require("./userService.js");
const jwtService = require("@src/auth/jwtService.js");
const passwordService = require("@src/auth/passwordService.js");

async function signup(req, res) {
  const options = {
    userData: req.body,
    allowedFields: ["username", "email", "password", "avatar"],
  };

  const newUser = await userService.createUser(options);

  const token = jwtService.encodeToken(newUser.id);

  // could remove the user but not really necessary in my pet project
  res.status(201).send({
    user: newUser,
    token,
  });
}

async function login(req, res, next) {
  //1. get the user details(with password)
  const foundUser = await userService.getUserByEmailWithPassword(
    req.body.email
  );

  if (!foundUser) {
    return next("Invalid credentials.");
  }

  // 2.make sure passwords matches the password from database
  const isCorrectPassword = await passwordService.isValidPassword(
    req.body.password,
    foundUser.password
  );

  // 3. if passwords are not equal then send a vague message - no leaking
  if (!isCorrectPassword) {
    return next("Invalid credentials");
  }
  // 4.sign token
  const token = jwtService.encodeToken(foundUser.id);

  res.status(200).send({
    token,
  });
}

async function getAllUsers(req, res) {
  res.status(200).send(await userService.getAllUsers());
}

async function getOneUser(req, res) {
  res.status(200).send(await userService.getUserById(req.params.id));
}

// TODO: figure out how to handle dublicates...
async function createUser(req, res) {
  const options = {
    userData: req.body,
    allowedFields: ["username", "email", "password", "avatar"],
  };

  res.status(201).send(await userService.createUser(options));
}

// changing email is not allowed
async function updateUser(req, res) {
  const options = {
    id: req.params.id,
    userData: req.body,
    allowedFields: ["username", "password", "avatar"],
  };

  res.status(200).send(await userService.updateUser(options));
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
