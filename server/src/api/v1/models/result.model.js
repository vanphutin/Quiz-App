const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Result = {
  checkIsResult: async (quiz_id, user_id) => {
    const sql_checkIsResult =
      "SELECT COUNT(*) as count FROM results WHERE quiz_id = ? AND user_id = ?";
    try {
      const result = await query(sql_checkIsResult, [quiz_id, user_id]);
      console.log(result); // result là một mảng chứa đối tượng { count: ... }

      if (result[0].count > 0) {
        return true; // Đã tồn tại kết quả
      } else {
        return false; // Không có kết quả
      }
    } catch (error) {
      throw new Error(`ERROR: check Is Result - ${error.message}`);
    }
  },
  checkCountAttempts: async (quiz_id, user_id) => {
    const sql_checkCountAttempts =
      "SELECT COUNT(attempts)  as count  FROM results WHERE user_id= ? AND quiz_id=? ";
    try {
      const result = await query(sql_checkCountAttempts, [user_id, quiz_id]);

      return result[0].count;
    } catch (error) {
      throw new Error(`ERROR: check Count Attempts - ${error.message}`);
    }
  },
  postQuiz: async (result_id, quiz_id, user_id, score) => {
    const sql_postQuiz =
      "INSERT INTO results (result_id, quiz_id, user_id, score) VALUES (?, ?, ?, ?)";
    try {
      const result = await query(sql_postQuiz, [
        result_id,
        quiz_id,
        user_id,
        score,
      ]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: post quiz - ${error.message}`);
    }
  },
};

module.exports = Result;
