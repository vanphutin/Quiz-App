const express = require("express");
const authRouter = require("./auth.router");

module.exports = (app) => {
  const router = express.Router();
  router.use("/auth", authRouter);

  app.use("/api/v1", router); // Ensure there is a leading `/`
};
