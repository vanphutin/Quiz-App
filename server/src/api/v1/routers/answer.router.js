const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controoler");
router.post("/", answerController.postNewAnswer);
module.exports = router;
