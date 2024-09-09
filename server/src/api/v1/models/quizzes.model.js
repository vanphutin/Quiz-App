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
};

module.exports = Quizzes;
