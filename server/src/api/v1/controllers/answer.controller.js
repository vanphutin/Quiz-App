const Answer = require("../models/answer.model");
const Result = require("../models/result.model");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);
const { v4: uuidv4 } = require("uuid");

module.exports.postNewAnswer = async (question_id, option_text, is_correct) => {
  const option_id = uuidv4(); // Tạo ID tự động cho câu trả lời
  const sql_postNewAnswer =
    "INSERT INTO options(option_id, question_id, option_text, is_correct) VALUES(?, ?, ?, ?)";

  try {
    // Escape dữ liệu và sử dụng ID tự tạo
    const result = await query(sql_postNewAnswer, [
      mysql.escape(option_id),
      mysql.escape(question_id), // question_id sẽ được truyền từ client
      mysql.escape(option_text),
      mysql.escape(is_correct),
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
};

// thêm phần âm thanh cho câu hỏi nếu có thể
// RAMDOM câu hỏi
