const Result = require("../models/result.model");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.postResult = async (req, res) => {
  const { quiz_id, user_id, score } = req.body;
  const result_id = uuidv4();
  if (score < 0) {
    return res.status(400).json({
      codeStatus: 400,
      message: `Invalid score`,
    });
  }
  const result_init = ["quiz_id", "user_id"];
  for (let i = 0; i < result_init.length; i++) {
    if (!req.body[result_init[i]]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Missing required field: ${result_init[i]}`,
      });
    }
  }
  try {
    const checkAlreadyExistsResult = await Result.checkIsResult(
      quiz_id,
      user_id
    );
    if (checkAlreadyExistsResult) {
      await query(
        `UPDATE results SET score = score + ?, attempts = attempts + 1 WHERE quiz_id = ? AND user_id = ?`,
        [score, quiz_id, user_id]
      );
      return res.status(200).json({
        codeStatus: 200,
        message: "Score updated successfully",
      });
    }
    const result = await Result.postQuiz(result_id, quiz_id, user_id, score);
    return res.status(200).json({
      codeStatus: 200,
      message: "Update score successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at result: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.countAttempts = async (req, res) => {
  const { quiz_id, user_id } = req.query; // Lấy từ req.query

  const result_init = ["quiz_id", "user_id"];
  for (let i = 0; i < result_init.length; i++) {
    if (!req.query[result_init[i]]) {
      // Kiểm tra req.query
      return res.status(400).json({
        codeStatus: 400,
        message: `Missing required field: ${result_init[i]}`,
      });
    }
  }

  try {
    const cntAttempts = await Result.checkCountAttempts(quiz_id, user_id);
    return res.status(200).json({
      codeStatus: 200,
      data: {
        quiz_id: quiz_id,
        user_id: user_id,
        attempts: cntAttempts[0]?.attempts,
        score: cntAttempts[0]?.score,
      },
      message: "Get count attempts successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at result: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.overView = async (req, res) => {
  const { quiz_id, user_id } = req.query; // Lấy từ req.query

  const result_init = ["quiz_id", "user_id"];
  for (let i = 0; i < result_init.length; i++) {
    if (!req.query[result_init[i]]) {
      // Kiểm tra req.query
      return res.status(200).json({
        codeStatus: 400,
        message: `Missing required field: ${result_init[i]}`,
      });
    }
  }

  try {
    // Gọi hàm truy vấn và lấy kết quả
    const overview = await Result.overViewQuiz(quiz_id, user_id);
    if (!overview) {
      return res.status(404).json({
        codeStatus: 404,
        message: "No data found for the given quiz_id and user_id",
      });
    }
    let GET_OVERVIEW = {};
    if (overview.attempts === null) {
      GET_OVERVIEW = await query(
        `SELECT quiz.title,quiz.created_by_user_id, COUNT(ques.question_id) AS totalQuestion
                                            FROM quizzes quiz
                                            JOIN questions ques ON ques.quiz_id = quiz.quiz_id
                                            WHERE quiz.quiz_id = ?`,
        [quiz_id]
      );
    }
    // console.log(GET_OVERVIEW_V2);
    // console.log("overview", overview.attempts === null);
    return res.status(200).json({
      codeStatus: 200,
      message: "Data retrieved successfully",
      data: overview.attempts === null ? GET_OVERVIEW[0] : overview,
    });
  } catch (error) {
    console.error(error); // Ghi lỗi vào console để dễ dàng debug
    return res.status(500).json({
      codeStatus: 500,
      message: "An error occurred while processing the request",
      error: error.message, // Gửi thông báo lỗi chi tiết
    });
  }
};
