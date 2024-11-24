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
      SELECT 
        c.category_name,
        q.quiz_id,
        q.title,
        q.description,
        q.created_by_user_id,
        q.created_at,
        q.updated_at,
        q.is_deleted,
        q.level,
        u.username
      FROM categories c
      JOIN quizzes q ON c.category_id = q.category_id
      JOIN users u ON q.created_by_user_id = u.user_id
      WHERE q.level = ? AND q.is_deleted = 0
      ORDER BY q.created_at
      LIMIT ? OFFSET ?`;

    try {
      const rows = await query(sql_getQuizzesLevel, [level, limit, offset]);

      // Nhóm dữ liệu trên ứng dụng
      const groupedResult = rows.reduce((acc, row) => {
        if (!acc[row.category_name]) acc[row.category_name] = [];
        acc[row.category_name].push({
          quiz_id: row.quiz_id,
          title: row.title,
          description: row.description,
          created_by_user_id: row.created_by_user_id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          is_deleted: row.is_deleted,
          level: row.level,
          username: row.username,
        });
        return acc;
      }, {});

      return groupedResult;
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
    const sql_createNewQuiz = `INSERT INTO quizzes (quiz_id,
    title,
    description,
    created_by_user_id,
    category_id,
    level) VALUES (?, ?, ?, ?, ?, ?) `;

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
