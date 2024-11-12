const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");
const permisson = require("../middlewares/checkPermisson");

router.post("/", resultController.postResult);
router.get("/count-attempts", resultController.countAttempts);
router.get("/ovevivew", permisson.checkAuth, resultController.overView);
router.post("/submit-answers", resultController.checkAnswer);

module.exports = router;
