const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controller");
router.post("/", answerController.postNewAnswer);
module.exports = router;
