const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history.controller");

router.get("/", historyController.geHistory);

module.exports = router;
