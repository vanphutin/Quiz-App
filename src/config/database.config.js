require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST, // e.g., 'localhost'
  port: process.env.MYSQL_PORT, // e.g., '3306'
  user: process.env.MYSQL_USER, // e.g., 'root'
  password: process.env.MYSQL_PASSWORD || "", // e.g., 'your_password'
  database: process.env.MYSQL_DB, // e.g., 'quiz_app'
});

pool.getConnection((err, connection) => {
  if (err) {
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

    process.exit(1); // Dừng server nếu không thể kết nối
  }

  if (connection) connection.release();
  return;
});

// Export the pool using promise-based methods
module.exports = pool;
