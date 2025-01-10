"use strict";

const express = require("express");
const app = express();
const userRouter = require("@src/user/userRouter.js");
const noteRouter = require("@src/note/noteRouter.js");

// body parser
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

// not found, for now, later will do something like `next(new error(something something))`
// eslint-disable-next-line no-unused-vars
app.all("*", (req, res, next) => {
  res.status(200).send(`${req.originalUrl} is not found on this server`);
});

module.exports = app;
