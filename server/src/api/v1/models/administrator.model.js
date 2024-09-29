const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Administrator = {
  // get all  users
  getUsers: async (limit, offset, sort) => {
    let _sort;
    if (sort) {
      _sort = `ORDER BY username  ${sort}`;
    }
    const sql_getUsers = `SELECT * FROM users WHERE is_deleted = 0  ${
      _sort || ""
    } LIMIT ? OFFSET ?`;

    try {
      const result = await query(sql_getUsers, [limit, offset]);
      return result;
    } catch (error) {
      console.error("Error in getUsers:", error);
      throw error;
    }
  },
  countUsers: async () => {
    const sql_countUsers = "SELECT COUNT(*) AS count FROM users";
    try {
      const result = await query(sql_countUsers);
      // Kiểm tra và trả về kết quả đúng
      if (result && result[0]) {
        return result[0].count; // Trả về số lượng người dùng
      }
      return 0; // Trường hợp không có kết quả, trả về 0
    } catch (error) {
      console.error("Error counting users:", error.message);
      throw error; // Để hàm gọi có thể bắt lỗi và xử lý tiếp
    }
  },

  countQuiz: async () => {
    const sql_getQuizzes = "SELECT COUNT(*) AS count FROM quizzes";
    try {
      const result = await query(sql_getQuizzes);
      if (result && result[0]) {
        return result[0].count;
      }
      return 0;
    } catch (error) {
      console.error("Error in getQuizzes:", error);
      throw error;
    }
  },
  getQuiz: async (limit, offset, userID) => {
    let sql_getQuiz = `SELECT q.*, u.username, c.category_name, u.user_id  
                       FROM categories c 
                       JOIN quizzes q 
                       ON c.category_id = q.category_id 
                       JOIN users u 
                       ON u.user_id = q.created_by_user_id 
                       WHERE q.is_deleted=0`;

    // Nếu userID được cung cấp, thêm điều kiện lọc theo userID
    if (userID) {
      sql_getQuiz += ` AND u.user_id = ?`;
    }

    // Thêm phân trang
    sql_getQuiz += ` LIMIT ? OFFSET ?`;

    try {
      const params = userID ? [userID, limit, offset] : [limit, offset];
      const result = await query(sql_getQuiz, params);

      return result;
    } catch (error) {
      console.error("Error in getQuiz:", error);
      throw error;
    }
  },
  countQuestion: async () => {
    const sql_countQuestion = "SELECT COUNT(*) AS count FROM questions";
    try {
      const result = await query(sql_countQuestion);
      if (result && result[0]) {
        return result[0].count;
      }
      return 0;
    } catch (error) {
      console.error("Error in countQuestion:", error);
      throw error;
    }
  },
  countCategories: async () => {
    const sql_countCategories = "SELECT COUNT(*) AS count FROM categories";
    try {
      const result = await query(sql_countCategories);
      if (result && result[0]) {
        return result[0].count;
      }
      return 0;
    } catch (error) {
      console.error("Error in countCategories:", error);
      throw error;
    }
  },
  getCategories: async () => {
    const sql_getCategories = "SELECT * FROM categories";
    try {
      const result = await query(sql_getCategories);
      return result;
    } catch (error) {
      console.error("Error in getCategories:", error);
      throw error;
    }
  },
};

module.exports = Administrator;
