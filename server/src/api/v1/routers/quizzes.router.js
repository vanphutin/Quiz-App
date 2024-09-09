const express = require("express");
const router = express.Router();
const quizzesController = require("../controllers/quizzes.controller");
router.get("/levels", quizzesController.getLevels);

module.exports = router;
