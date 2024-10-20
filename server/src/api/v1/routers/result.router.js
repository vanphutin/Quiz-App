const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");

router.post("/", resultController.postResult);
router.get("/count-attempts", resultController.countAttempts);

module.exports = router;
