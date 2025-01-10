"use strict";

const express = require("express");
const app = express();
const userRouter = require("@src/user/userRouter.js");

// body parser
app.use(express.json());

app.use("/api/users", userRouter);

// not found, for now, later will do something like `next(new error(something something))`
// eslint-disable-next-line no-unused-vars
app.all("*", (req, res, next) => {
  res.status(200).send(`${req.originalUrl} is not found on this server`);
});

module.exports = app;
