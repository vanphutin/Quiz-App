const express = require("express");
const router = express.Router();
const permisson = require("../middlewares/checkPermisson");
const questionController = require("../controllers/question.controller");
router.post("/", questionController.postNewQuestions);
router.get("/:id", permisson.checkToken, questionController.getQuestion);

module.exports = router;
