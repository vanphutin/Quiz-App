require("dotenv").config();
const mysql = require("mysql2");

// Tạo pool kết nối MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST, // e.g., 'localhost'
  port: process.env.MYSQL_PORT, // e.g., '3306'
  user: process.env.MYSQL_USER, // e.g., 'root'
  password: process.env.MYSQL_PASSWORD || "", // e.g., 'your_password'
  database: process.env.MYSQL_DB, // e.g., 'quiz_app'
});

// Tạo promisePool cho phép sử dụng async/await
const promisePool = pool.promise();

// Kiểm tra kết nối cơ sở dữ liệu và xử lý lỗi
async function checkDatabaseConnection() {
  try {
    // Kiểm tra cơ sở dữ liệu bằng câu lệnh SELECT 1
    const [rows, fields] = await promisePool.query("SELECT 1");
    console.log("Database is connected and working!");
  } catch (err) {
    // Xử lý các lỗi kết nối và dừng ứng dụng nếu không thể kết nối
    console.error("Error connecting to database:", err);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }
}

// Kết nối cơ sở dữ liệu và xử lý lỗi
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);

    // Xử lý các mã lỗi khác nhau
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
    if (err.code === "ER_NOT_SUPPORTED_AUTH_MODE") {
      console.error(
        "Authentication mode not supported. Consider upgrading the MySQL client or adjusting the user authentication mode."
      );
    }

    // Kết thúc ứng dụng nếu không thể kết nối
    process.exit(1); // Dừng server nếu không thể kết nối
  }

  if (connection) connection.release();
  checkDatabaseConnection(); // Kiểm tra kết nối cơ sở dữ liệu

  // Export pool để có thể sử dụng ở nơi khác
  module.exports = pool;
});
