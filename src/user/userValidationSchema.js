"use strict";

const Joi = require("joi");

// with("field1", "field2") Requires the presence of other keys whenever the specified key is present.
const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeatPassword: Joi.ref("password"),
}).with("password", "repeat_password");

// const updateUserSchema = Joi.object({});

// const deleteUserSchema = Joi.object({});

module.exports = {
  createUserSchema,
};
