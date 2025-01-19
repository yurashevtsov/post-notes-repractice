"use strict";

const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

// with("field1", "field2") Requires the presence of other keys whenever the specified key is present.
const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  repeatPassword: Joi.ref("password"),
  avatar: Joi.string().optional(),
}).with("password", "repeatPassword");

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  avatar: Joi.string().optional(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).optional(),
  repeatPassword: Joi.ref("password"),
}).with("password", "repeatPassword");

module.exports = {
  loginSchema,
  createUserSchema,
  updateUserSchema,
};
