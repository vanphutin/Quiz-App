const express = require("express");
const router = express.Router();
const quizzesController = require("../controllers/quizzes.controller");
const permisson = require("../middlewares/checkPermisson");

router.get("/levels", quizzesController.getLevels);
router.get("/", quizzesController.getQuizzesLevel);
router.post("/", permisson.checkPermission, quizzesController.createNewQuiz);
router.put("/:id", quizzesController.deleteQuiz);

module.exports = router;
