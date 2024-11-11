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
    const checkQuizQxistQuiz = await Result.checkCountAttempts(
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
    if (checkQuizQxistQuiz.length === 0) {
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
    // console.log("checkQuizQxistQuiz", checkQuizQxistQuiz);
    // kiểm tra xem đã có quizID và userID tồn tại ko
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
    console.error("Error in checkAnswer:", error); // Log lỗi để kiểm tra
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at answer: ${error.message}`,
      name: error.name,
    });
  }
};

// thêm phần âm thanh cho câu hỏi nếu có thể
// RAMDOM câu hỏi
