const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Quizzes = {
  getLevels: async () => {
    const sql_getLevel = "SELECT DISTINCT level FROM quizzes";
    try {
      const result = await query(sql_getLevel);
      return result;
    } catch (error) {
      throw new Error(`ERROR: get all Levels - ${error.message}`);
    }
  },
  getQuizzesLevel: async (level, sort, limit, offset) => {
    const sql_getQuizzesLevel = `
      SELECT c.category_name,
        GROUP_CONCAT(
          JSON_OBJECT(
            'quiz_id', q.quiz_id,
            'title', q.title,
            'description', q.description,
            'created_by_user_id', q.created_by_user_id,
            'created_at', q.created_at,
            'updated_at', q.updated_at,
            'is_deleted', q.is_deleted,
            'level', q.level,
            'username', u.username
          )
        ) AS quizzes
      FROM categories c
      JOIN quizzes q ON c.category_id = q.category_id
      JOIN users u ON q.created_by_user_id = u.user_id
      WHERE q.level = ? AND q.is_deleted = 0
      GROUP BY c.category_name
      ORDER BY q.created_at ${sort.toUpperCase()}
      LIMIT ? OFFSET ?`; // Thêm phần phân trang

    try {
      const result = await query(sql_getQuizzesLevel, [level, limit, offset]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: get Quizzes Level - ${error.message}`);
    }
  },
  createNewQuiz: async (
    quiz_id,
    title,
    description,
    created_by_user_id,
    category_id,
    level
  ) => {
    const sql_createNewQuiz = `
      INSERT INTO quizzes (quiz_id, title, description, created_by_user_id, category_id, level, created_at, updated_at, is_deleted, score)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 0, 100.00);
    `;

    try {
      const result = await query(sql_createNewQuiz, [
        quiz_id,
        title,
        description,
        created_by_user_id,
        category_id,
        level,
      ]);
      return result;
    } catch (error) {
      console.error("SQL Error:", error); // Log toàn bộ lỗi để debug
      throw new Error(`ERROR: create new quiz - ${error.message}`);
    }
  },

  deleteQuiz: async (quiz_id) => {
    // Truy vấn SQL xóa bản ghi trong bảng history liên quan đến quiz
    const sql_deleteHistory = `
      DELETE FROM history 
      WHERE quiz_id = ?`;

    // Truy vấn SQL xóa options liên quan đến quiz
    const sql_deleteOptions = `
      DELETE o 
      FROM options o
      INNER JOIN questions q ON o.question_id = q.question_id
      WHERE q.quiz_id = ?`;

    // Truy vấn SQL xóa questions liên quan đến quiz
    const sql_deleteQuestions = `
      DELETE FROM questions 
      WHERE quiz_id = ?`;

    // Truy vấn SQL xóa quiz
    const sql_deleteQuiz = `
      DELETE FROM quizzes 
      WHERE quiz_id = ?`;

    try {
      // Bắt đầu giao dịch
      await query("START TRANSACTION");

      // Xóa các bản ghi trong bảng history
      await query(sql_deleteHistory, [quiz_id]);

      // Xóa options liên quan đến quiz
      await query(sql_deleteOptions, [quiz_id]);

      // Xóa questions liên quan đến quiz
      await query(sql_deleteQuestions, [quiz_id]);

      // Xóa quiz
      const result = await query(sql_deleteQuiz, [quiz_id]);

      // Commit giao dịch
      await query("COMMIT");
      return result;
    } catch (error) {
      // Rollback nếu có lỗi
      await query("ROLLBACK");
      throw new Error(`ERROR: delete quiz - ${error.message}`);
    }
  },
};

module.exports = Quizzes;
