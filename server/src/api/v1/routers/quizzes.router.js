const express = require("express");
const router = express.Router();
const quizzesController = require("../controllers/quizzes.controller");
router.get("/levels", quizzesController.getLevels);
router.get("/", quizzesController.getQuizzesLevel);

module.exports = router;
