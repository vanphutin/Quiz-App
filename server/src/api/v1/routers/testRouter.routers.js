const express = require("express");
const router = express.Router();

const testController = require("../controllers/test.controller");

router.get("/", testController.test);

module.exports = router;
