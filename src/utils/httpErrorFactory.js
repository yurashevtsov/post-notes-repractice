"use strict";
const { HttpBaseError } = require("./httpErrors");

module.exports = class HttpErrorFactory {
  static buildHttpError(fromError) {
    let result;
    if(fromError instanceof HttpBaseError) {
      return result = fromError;
    }
  }
};
