const Result = require("../models/result.model");
const History = require("../models/history.model");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const Answer = require("../models/answer.model");
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

    let GET_OVERVIEW = {};
    if (!overview) {
      GET_OVERVIEW = await query(
        `SELECT quiz.title,quiz.created_by_user_id,0 AS attempts , COUNT(ques.question_id) AS totalQuestion
                                            FROM quizzes quiz
                                            JOIN questions ques ON ques.quiz_id = quiz.quiz_id
                                            WHERE quiz.quiz_id = ?`,
        [quiz_id]
      );
    }

    // console.log("overview", overview.attempts === null);
    return res.status(200).json({
      codeStatus: 200,
      message: "Data retrieved successfully",
      data: !overview ? GET_OVERVIEW[0] : overview,
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
module.exports.checkAnswer = async (req, res) => {
  const { user_id, quiz_id, answers } = req.body;

  // Kiểm tra đầu vào
  if (!user_id || !quiz_id || !Array.isArray(answers)) {
    return res.status(400).json({
      codeStatus: 400,
      status: "error",
      message: "Missing required parameters: user_id, quiz_id, or answers.",
    });
  }

  try {
    const getListResults = await Answer.getIsCheckAnswers(quiz_id);
    const cntAttempts = await Result.checkCountAttempts(quiz_id, user_id);
    const checkQuizExistQuiz = await Result.checkCountAttempts(
      quiz_id,
      user_id
    );
    // Kiểm tra số câu trả lời đúng
    const isCorrect = answers.reduce((count, answer) => {
      const question = getListResults.find(
        (result) => result.question_id === answer.questionIndex
      );
      return question && answer.answer === question.option_id
        ? count + 1
        : count;
    }, 0);

    // Tính điểm tối đa
    const totalQuesPoint = getListResults.length * 10; // Mỗi câu 10 điểm
    const totalQues = getListResults.length; // Tổng số câu hỏi

    // Tính số lần người dùng đã làm quiz
    const attempts = cntAttempts[0]?.attempts || 0;
    const reductionPercentage = 0.1; // 10% cho mỗi lần làm lại

    // Tổng số câu hỏi chưa làm và đã làm
    const totalNotDone = totalQues - answers.length;
    const totalDone = answers.length;
    const inCorrect = totalQues - isCorrect;

    // Tính điểm nhận được với công thức giảm điểm
    const PointsReceived =
      isCorrect === 0
        ? 0
        : (
            isCorrect *
            10 *
            Math.pow(1 - reductionPercentage, attempts)
          ).toFixed(2);

    // lịch sử bài kiểm tra
    await History.postHistory(
      uuidv4(),
      user_id,
      quiz_id,
      PointsReceived,
      attempts + 1
    );

    // kiểm tra sô lần làm bài
    if (checkQuizExistQuiz.length === 0) {
      const INSERT_DATA = await Result.postQuiz(
        uuidv4(),
        quiz_id,
        user_id,
        PointsReceived
      );
    } else {
      await query(
        `UPDATE results
        SET score = score + ${PointsReceived}, attempts = attempts + 1
        WHERE quiz_id = ? AND user_id = ?;
        `,
        [quiz_id, user_id]
      );
    }
    // kiểm tra xem đã có quizID và userID tồn tại ko
    // console.log("checkQuizQxistQuiz", checkQuizExistQuiz);
    return res.status(200).json({
      codeStatus: 200,
      status: "success",
      message: "Quiz results calculated successfully",
      data: {
        isCorrect,
        PointsReceived,
        totalQuesPoint,
        totalQues,
        attempts,
        totalNotDone,
        totalDone,
        inCorrect,
      },
    });
  } catch (error) {
    console.error("Error in checkAnswer:", error);
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at answer: ${error.message}`,
      name: error.name,
    });
  }
};
