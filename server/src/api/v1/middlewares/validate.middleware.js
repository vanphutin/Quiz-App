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
