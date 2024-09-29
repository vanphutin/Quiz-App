const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Answer = {
  postNewAnswer: async (option_id, question_id, option_text, is_correct) => {
    const sql_postNewAnswer =
      "INSERT INTO options(option_id, question_id, option_text, is_correct) VALUES(?, ?, ?, ?)";
    try {
      const result = await query(sql_postNewAnswer, [
        option_id,
        question_id,
        option_text,
        is_correct,
      ]);
      return result;
    } catch (error) {
      console.error(
        `Error in postNewAnswer with data: ${[
          option_id,
          question_id,
          option_text,
          is_correct,
        ]}`,
        error
      );
      throw error;
    }
  },
};

module.exports = Answer;
