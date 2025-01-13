"use strict";

const config = require("@src/config/index.js");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const packageJson = require("../../package.json");

function encodeToken(id) {
  return jwt.sign({ sub: id, scope: "AUTHENTICATION" }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
    issuer: packageJson.name,
    audience: packageJson.name,
  });
}

async function decodeToken(token) {
  // I just want to turn it into async function
  return await promisify(jwt.verify)(token, config.jwtSecret);
}

module.exports = {
  encodeToken,
  decodeToken,
};

// Signing a token with 1 hour of expiration:
// 1.
// jwt.sign({
//     exp: Math.floor(Date.now() / 1000) + (60 * 60),
//     data: 'foobar'
//   }, 'secret');
//   Another way to generate a token like this with this library is:
// 2.
//   jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: 60 * 60 });
// 3. Even better way
//   jwt.sign({
//     data: 'foobar'
//   }, 'secret', { expiresIn: '1h' });

// Backdate a jwt 30 seconds
// for testing for example :)

// var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, config.jwtSecret);
