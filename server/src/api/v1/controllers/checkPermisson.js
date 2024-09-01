import Auth from "../models/auth.model";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const md5 = require("md5");

//=== PHÂN QUYỀN NGƯỜI DÙNG
export const checkPermission = async (req, res, next) => {
  try {
    // kiểm tra người dùng đăng nhập hay chưa
    const token = req.headers.authorization?.split(" ")[1];

    // kiểm tra token
    if (!token) {
      return res.status(403).json({
        codeStatus: 403,
        message: "Not logged in",
      });
    }

    // xác thực token và lấy thông tin người dùng
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.user_id);

    // kiểm tra người dùng tồn tại
    if (!user) {
      return res.status(404).json({
        codeStatus: 404,
        message: "User not found",
      });
    }

    // kiểm tra quyền người dùng, ví dụ: chỉ cho phép 'admin' và 'instructor'
    if (user.role !== "admin" && user.role !== "instructor") {
      return res.status(403).json({
        codeStatus: 403,
        message: "Permission denied",
      });
    }

    // lưu thông tin người dùng vào req để sử dụng trong các middleware hoặc route tiếp theo
    req.user = user;

    // tiếp tục xử lý
    next();
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: error.message,
      name: error.name,
    });
  }
};
