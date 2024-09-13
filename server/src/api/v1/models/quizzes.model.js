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
      WHERE q.level = ?
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
};

module.exports = Quizzes;
