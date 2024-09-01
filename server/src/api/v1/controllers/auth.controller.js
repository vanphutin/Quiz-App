const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
