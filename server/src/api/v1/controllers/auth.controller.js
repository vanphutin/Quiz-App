const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateHelper = require("../helpers/generate.helper");
const sendMailHelper = require("../helpers/sendMail.helper");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.login(email, password);

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(401).json({
        codeStatus: 401,
        message: "Invalid email or password",
      });
    }

    // Handle JWT
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      codeStatus: 200,
      messages: "Login successful",
      data: {
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          school: user.school,
          email: user.email,
          gender: user.gender,
          role: user.role,
          avatar: user.avatar,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at auth: ${error.message}`,
      name: error.name,
    });
  }
};
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const otp_id = uuidv4(); // Tạo một UUID cho otp_id

  try {
    // Giả sử Auth.forgotPassword trả về một đối tượng chứa thông tin user, bao gồm user_id
    const user = await Auth.forgotPassword(email);

    if (!user) {
      return res.status(400).json({
        codeStatus: 400,
        message: "No result found for email check",
      });
    }

    const timeExpire = 5; // 5 phút
    const otp = generateHelper.generateRandomNumber(6); // Tạo OTP 6 chữ số
    const expiresAt = new Date(Date.now() + timeExpire * 60 * 1000); // Thời gian hết hạn

    // Thêm OTP vào bảng otp_requests
    await query(
      "INSERT INTO otp_requests (otp_id, user_id, otp_code, expiration_at) VALUES (?, ?, ?, ?)",
      [otp_id, user.user_id, otp, expiresAt]
    );

    const subject = "OTP code to authenticate and retrieve password";
    const text = `
    <div class=" box-message-send-otp " >
      <div style="margin-bottom:10px">Hi ${user.firstname}, </div>
      <p>We have received your request to reset your Quiz App password.</p>
      <p style="margin-bottom:10px">Enter the following password reset code:</p>
      <div style="margin:15px 0">
        <b style="color:blue ; font-size:20px ; padding:10px 20px ; border : 1px solid #000 ;  "  >${otp}</b>
      </div>
      <p style="margin-top:20px">Use in ${timeExpire} minutes, do not share this code with anyone!</p>
    </div>
    `;

    sendMailHelper.sendEmail(email, subject, text);

    return res.status(201).json({
      codeStatus: 201,
      message: "Create OTP successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at auth: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Auth.verifyOtp(otp, email);

    if (!user || user.length === 0) {
      return res.status(400).json({
        codeStatus: 400,
        message: "OTP expired or invalid",
      });
    }

    // OTP hợp lệ
    return res.status(200).json({
      codeStatus: 200,
      message: "OTP verified successfully",
      user_id: user[0].user_id, // Trả về user_id đầu tiên trong danh sách
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at auth: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { user_id, newPassword } = req.body;
  console.log("newPassword", newPassword);

  try {
    const user = await Auth.resetPassword(user_id, md5(newPassword));
    if (!user) {
      return res.status(400).json({
        codeStatus: 400,
        message: "No result found for email check",
      });
    }
    return res.status(200).json({
      codeStatus: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at auth: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.register = async (req, res) => {
  const {
    email,
    username,
    lastname,
    firstname,
    role,
    school,
    gender,
    password,
  } = req.body;
  const user_id = uuidv4();
  try {
    const user = await Auth.register(
      user_id,
      username,
      email,
      lastname,
      firstname,
      role,
      school,
      gender,
      md5(password)
    );
    if (!user) {
      return res.status(401).json({
        codeStatus: 401,
        message: "Invalid field",
      });
    }
    res.status(201).json({
      codeStatus: 201,
      message: "Registration successful",
      userID: user.user_id,
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at auth: ${error.message}`,
      name: error.name,
    });
  }
};
