const Auth = require("../models/auth.model");
module.exports.validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Kiểm tra các trường theo yêu cầu
  const requiredFields = ["email", "password"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Error: Missing required field: ${field}`,
      });
    }
  }

  // Kiểm tra tồn tại email
  const emailExists = await Auth.checkEmailExists(email);
  if (!emailExists) {
    return res.status(400).json({
      codeStatus: 400,
      error: "Email does not exist",
    });
  }

  // Kiểm tra mật khẩu hợp lệ
  const isPasswordValid = await Auth.checkPasswordValid(email, password);

  if (!isPasswordValid) {
    return res.status(401).json({
      codeStatus: 401,
      error: "Invalid password",
    });
  }

  // Hợp lệ
  next();
};

module.exports.checkEmailValid = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      codeStatus: 400,
      message: `Error: Missing required field: email`,
    });
  }
  // Kiểm tra tồn tại email
  const emailExists = await Auth.checkEmailExists(email);
  if (!emailExists) {
    return res.status(400).json({
      codeStatus: 400,
      error: "Email does not exist",
    });
  }

  // Hợp lệ
  next();
};

module.exports.checkOtpValid = async (req, res, next) => {
  const { otp, email } = req.body;

  // Kiểm tra các trường theo yêu cầu
  const requiredFields = ["email", "otp"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Error: Missing required field: ${field}`,
      });
    }
  }

  // Hợp lệ
  next();
};
module.exports.checkResetPassValid = async (req, res, next) => {
  const { user_id, newPassword } = req.body;

  // Kiểm tra các trường theo yêu cầu
  const requiredFields = ["user_id", "newPassword"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Error: Missing required field: ${field}`,
      });
    }
  }

  //kiểm tra người dùng có tồn tại không
  const userexists = await Auth.findById(user_id);

  if (!userexists || userexists.length <= 0) {
    return res.status(400).json({
      codeStatus: 400,
      message: "No user results found to check",
    });
  }

  // kiểm tra độ dài password
  if (newPassword.length < 6) {
    return res.status(403).json({
      codeStatus: 403,
      message: `Error: Password too short`,
    });
  }
  if (newPassword.length >= 50) {
    return res.status(403).json({
      codeStatus: 403,
      message: `Password too long`,
    });
  }
  // Hợp lệ
  next();
};
