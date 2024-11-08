const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const md5 = require("md5");

// Kiểm tra xem JWT_SECRET có được định nghĩa không
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

//=== PHÂN QUYỀN NGƯỜI DÙNG
module.exports.checkPermission = async (req, res, next) => {
  try {
    // Kiểm tra token có trong header không và đảm bảo đúng định dạng
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res.status(403).json({
        codeStatus: 403,
        message: "Not logged in",
      });
    }

    // Xác thực token và lấy thông tin người dùng
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(403).json({
        codeStatus: 403,
        message: "Invalid or malformed token",
      });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await Auth.findById(decoded.user_id);
    if (!user) {
      return res.status(404).json({
        codeStatus: 404,
        message: "User not found",
      });
    }

    // Kiểm tra quyền người dùng
    const allowedRoles = ["admin", "instructor"];
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        codeStatus: 403,
        message: "Permission denied",
      });
    }

    // Lưu thông tin người dùng vào req để sử dụng tiếp
    req.user = user;

    next();
  } catch (error) {
    console.error("Permission check failed:", error); // Ghi log để dễ tìm lỗi
    return res.status(500).json({
      codeStatus: 500,
      message: error.message,
      name: error.name,
    });
  }
};

// KIỂM TRA TOKEN HẾT HẠN
module.exports.checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(403).json({
      codeStatus: 403,
      message: "Token is required",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next(); // Token hợp lệ, cho phép tiếp tục
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 401,
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(403).json({
      codeStatus: 403,
      message: "Invalid token",
    });
  }
};

// Middleware checkAuth cập nhật trả về status 200 và thêm success = false
module.exports.checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(200).json({
      success: false,
      codeStatus: 401,
      message: "Not logged in",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    let errorResponse = {
      success: false,
      message: "",
    };

    if (error.name === "TokenExpiredError") {
      errorResponse = {
        ...errorResponse,
        codeStatus: 401,
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      };
    } else if (error.name === "JsonWebTokenError") {
      errorResponse = {
        ...errorResponse,
        codeStatus: 403,
        message: "Invalid token",
        code: "INVALID_TOKEN",
      };
    } else {
      errorResponse = {
        ...errorResponse,
        codeStatus: 500,
        message: "Internal server error",
        error: error.message,
      };
    }

    return res.status(200).json(errorResponse); // Trả về status 200 để Axios không báo lỗi đỏ
  }
};
