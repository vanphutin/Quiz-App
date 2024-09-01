const express = require("express");
const testRouter = require("./testRouter.routers");

module.exports = (app) => {
  const router = express.Router();
  router.use("/test", testRouter); // Use `testRouter` here

  app.use("/api/v1", router); // Ensure there is a leading `/`
};
