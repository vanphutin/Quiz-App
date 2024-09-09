const express = require("express");
const authRouter = require("./auth.router");
const quizzesRouter = require("./quizzes.router");

module.exports = (app) => {
  const router = express.Router();
  router.use("/auth", authRouter);
  router.use("/quizzes", quizzesRouter);

  app.use("/api/v1", router); // Ensure there is a leading `/`
};
