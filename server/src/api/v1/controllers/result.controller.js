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
    console.log("checkAlreadyExistsResult", checkAlreadyExistsResult);
    if (checkAlreadyExistsResult) {
      console.log("yes");
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
    console.log(cntAttempts);
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