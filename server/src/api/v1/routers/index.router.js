const express = require("express");
const authRouter = require("./auth.router");
const quizzesRouter = require("./quizzes.router");
const administratorRouter = require("./administrator.router");
const questionRouter = require("./question.router");
const answerRouter = require("./answer.router");

module.exports = (app) => {
  const router = express.Router();
  router.use("/auth", authRouter);
  router.use("/quizzes", quizzesRouter);
  router.use("/administrator", administratorRouter);
  router.use("/question", questionRouter);
  router.use("/answer", answerRouter);

  app.use("/api/v1", router); // Ensure there is a leading `/`
};
