const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");

router.post("/login", validate.validateLogin, authController.login);
router.post(
  "/forgot-password",
  validate.checkEmailValid,
  authController.forgotPassword
);
router.post("/verify-otp", validate.checkOtpValid, authController.verifyOtp);
router.post(
  "/reset-password",
  validate.checkResetPassValid,
  authController.resetPassword
);

module.exports = router;
