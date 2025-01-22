"use strict";
const {
  HttpBaseError,
  HttpInternalServerError,
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpForbiddenError,
  HttpNotFoundError,
} = require("./httpErrors");

// ! add this 2 cases
const {
  ValidationError: SequelizeValidationError,
  UniqueConstraintError: SequelizeUniqueConstraintError,
} = require("sequelize");

const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const { ValidationError } = require("joi");

module.exports = class HttpErrorFactory {
  static buildHttpError(fromError) {
    let result;
    if (fromError instanceof HttpBaseError) {
      result = fromError;
    } else {
      switch (fromError.constructor) {
        case ValidationError:
          result = new HttpBadRequestError(fromError.message);
          break;

        case TokenExpiredError:
          result = new HttpUnauthorizedError(fromError.message);
          break;

        case JsonWebTokenError:
          result = new HttpBadRequestError(fromError.message);
          break;

        default:
          result = new HttpInternalServerError(fromError.message);
      }
    }

    return result;
  }
};

/*
  ? Custom messages for known errors? Like: Token has expired, please, log in again
  ? JsonWebTokenError - (someone tried to forge token) - Invalid token
  ? validationError - from joi, could intentionally make bad requests, see what we get and form some nice message
  ? sequelize has dublicate errors, may be after looking at object, they provide an array with dublicates and form a string
  ? about not found "something", its my choice to throw errors to let know that it was not found, empty messages do not convey meaning
*/
