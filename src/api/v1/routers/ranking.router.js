const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/ranking.controller");

router.get("/:id", rankingController.getRanking);

module.exports = router;
