"use strict";

const Joi = require("joi");
const helpers = require("@src/utils/helpers");

const querySchema = Joi.object({
  // lets just keep it simple - only allowing strings and convert them to an array of strings - for sequelize ->  attributes:["field1", "field2"]
  fields: Joi.string().custom(helpers.convertStringToArrayForJoi).optional(),
  page: Joi.number().default(1),
  limit: Joi.number().min(1).max(1000).default(100),
  // sortDirection: Joi.string().default("asc"), why I commented it out? I want to provide sort direction in order by an underscore, if its not specified, SQLIZE will do ASC, otherwise _desc should be specified by user
  order: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string().custom(helpers.convertStringToArrayForJoi)
  ),
});

const validateIdSchema = Joi.object({
  id: Joi.number().required(),
});

const createUserNoteSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().optional(),
});

module.exports = {
  querySchema,
  validateIdSchema,
  createUserNoteSchema,
};
