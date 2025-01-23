"use strict";

const express = require("express");
const app = express();
const userRouter = require("@src/user/userRouter.js");
const noteRouter = require("@src/note/noteRouter.js");
const { HttpNotFoundError } = require("@src/utils/httpErrors");
const globalErrorHandler = require("@src/utils/globalErrorHandler.js");

// body parser
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);

app.all("*", (req, res, next) => {
  next(new HttpNotFoundError(`${req.originalUrl} is not found on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
