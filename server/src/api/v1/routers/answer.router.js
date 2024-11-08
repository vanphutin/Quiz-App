const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controller");
router.post("/", answerController.postNewAnswer);
router.post("/submit-answers", answerController.checkAnswer);
module.exports = router;
