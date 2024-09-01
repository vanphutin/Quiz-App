const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");

router.post("/login", validate.validateLogin, authController.login);

module.exports = router;
