// models/question.model.js
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Question = {
  postNewQuestions: async (questions) => {
    const sql_postNewQuestion = `INSERT INTO questions (question_id, quiz_id, question_text, question_type, difficulty) VALUES ?`;

    // Tạo dữ liệu dưới dạng mảng để phù hợp với SQL
    const values = questions.map((q) => [
      q.question_id,
      q.quiz_id,
      q.question_text,
      q.question_type,
      q.difficulty,
    ]);

    try {
      const result = await query(sql_postNewQuestion, [values]);

      // Lưu từng câu trả lời cho mỗi câu hỏi
      const sql_postAnswer = `INSERT INTO options (option_id, option_text, is_correct, question_id) VALUES ?`;
      const answerValues = [];

      questions.forEach((q) => {
        q.answer.forEach((a) => {
          answerValues.push([
            a.option_id,
            a.option_text,
            a.is_correct,
            q.question_id,
          ]);
        });
      });
      await query(sql_postAnswer, [answerValues]);

      return result;
    } catch (error) {
      console.error("Error in postNewQuestions:", error);
      throw error;
    }
  },
};

module.exports = Question;
