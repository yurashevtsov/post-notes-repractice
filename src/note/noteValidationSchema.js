"use strict";

const Joi = require("joi");

const validateIdSchema = Joi.object({
  id: Joi.number().required(),
});

const createUserNoteSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().optional(),
});

module.exports = {
  validateIdSchema,
  createUserNoteSchema,
};
