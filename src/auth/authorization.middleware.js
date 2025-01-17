"use strict";

const jwtService = require("@src/auth/jwtService.js");
const userService = require("@src/user/userService.js");
const catchAsync = require("@src/utils/catchAsync.js");

async function tokenAuthHandler(req, res, next) {
  // so, assuming : req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  //   const token = req.headers.authorization.split(" ")[1];

  // 1. get user token
  let token = undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next("Invalid token or it doesnt exists.");
  }

  // 2.decode token
  const payload = await jwtService.decodeToken(token);

  // 3. Make sure scope contains - AUTHENTICATION
  if (!payload?.scope.includes("AUTHENTICATION")) {
    return next("Invalid token. Scope error.");
  }

  // 4. Make sure user still exists
  const foundUser = await userService.getUserByIdNoError(payload.sub);

  if (!foundUser) {
    return next("User no longer exists. Invalid token.");
  }

  // 5. make sure user didnt change his password after token was issued
  if (foundUser.changedPasswordAt) {
    jwtService.userChangedPasswordAfter(
      foundUser.changedPasswordAt,
      payload.iat
    );
  }

  // 6. attach user to a request object
  req.user = foundUser;

  next();
}

module.exports = {
  tokenAuthHandler: catchAsync(tokenAuthHandler),
};
