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
  getIsCheckAnswers: async (quiz_id) => {
    const sql_getIsCheckAnswers = ` SELECT 
                                        q.question_id,
                                        q.question_text,
                                        q.difficulty,
                                        o.option_id,
                                        o.is_correct
                                    FROM 
                                        questions q
                                    LEFT JOIN 
                                        options o ON q.question_id = o.question_id
                                    WHERE 
                                        q.quiz_id=? AND q.is_deleted = 0 AND o.is_correct = 1`;
    try {
      const result = await query(sql_getIsCheckAnswers, [quiz_id]);
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
