"use strict";

const catchAsync = require("@src/utils/catchAsync.js");

async function getAllUsers(req, res) {
  
}

async function getOneUser(req, res) {

}

async function createUser(req, res) {
  
}

// we wont allow to change password here, i'm slightly concerned it does 3 queries - find user, update user, query user with updated data :D
async function updateUser(req, res) {
  
}

async function deleteUser(req, res) {
  
}

module.exports = {
  getAllUsers: catchAsync(getAllUsers),
  getOneUser: catchAsync(getOneUser),
  createUser: catchAsync(createUser),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
