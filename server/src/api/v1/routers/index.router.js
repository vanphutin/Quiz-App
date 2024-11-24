const express = require("express");
const authRouter = require("./auth.router");
const quizzesRouter = require("./quizzes.router");
const administratorRouter = require("./administrator.router");
const questionRouter = require("./question.router");
const answerRouter = require("./answer.router");
const resultRouter = require("./result.router");
const rankingRouter = require("./ranking.router");
const historyRouter = require("./history.router");
const categoryRouter = require("./category.router");
const userRouter = require("./user.router");

module.exports = (app) => {
  const router = express.Router();
  router.use("/auth", authRouter);
  router.use("/quizzes", quizzesRouter);
  router.use("/administrator", administratorRouter);
  router.use("/question", questionRouter);
  router.use("/answer", answerRouter);
  router.use("/result", resultRouter);
  router.use("/ranking", rankingRouter);
  router.use("/history", historyRouter);
  router.use("/category", categoryRouter);
  router.use("/user", userRouter);

  app.use("/api/v1", router); // Ensure there is a leading `/`
};
