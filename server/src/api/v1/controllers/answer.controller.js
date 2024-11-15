const Answer = require("../models/answer.model");
const Result = require("../models/result.model");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);
const { v4: uuidv4 } = require("uuid");

module.exports.postNewAnswer = async (req, res) => {
  const { question_id, option_text, is_correct } = req.body;
  const option_id = uuidv4();

  const answer_init = ["question_id", "option_text", "is_correct"];
  for (let i = 0; i < answer_init.length; i++) {
    if (!req.body[answer_init[i]]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Missing required field: ${answer_init[i]}`,
      });
    }
  }
  try {
    const answer = await Answer.postNewAnswer(
      option_id,
      question_id,
      option_id,
      is_correct
    );

    return res.status(201).json({
      codeStatus: 201,
      message: "Create new a answer successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at answer: ${error.message}`,
      name: error.name,
    });
  }
};

// thêm phần âm thanh cho câu hỏi nếu có thể
// RAMDOM câu hỏi
