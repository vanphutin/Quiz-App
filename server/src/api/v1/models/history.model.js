const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const History = {
  postHistory: async (history_id, user_id, quiz_id, score, attempts) => {
    // Specify only the columns without completion_date to use the default value
    const sql_postHistory =
      "INSERT INTO history (history_id, user_id, quiz_id, score, attempts) VALUES (?, ?, ?, ?, ?)";
    try {
      const result = await query(sql_postHistory, [
        history_id,
        user_id,
        quiz_id,
        score,
        attempts,
      ]);
      return result;
    } catch (error) {
      console.log("error", error);
      throw new Error("ERROR: postHistory", error);
    }
  },
  getHistory: async (user_id) => {
    const sql_getHistory = `SELECT his.history_id, his.score,his.completion_date,his.attempts , quiz.title
                          FROM history his
                          JOIN quizzes quiz ON quiz.quiz_id = his.quiz_id
                          WHERE his.user_id = ?`;
    try {
      const result = await query(sql_getHistory, [user_id]);
      return result;
    } catch (error) {
      console.log("error", error);
      throw new Error("ERROR: getHistory", error);
    }
  },
};

module.exports = History;
