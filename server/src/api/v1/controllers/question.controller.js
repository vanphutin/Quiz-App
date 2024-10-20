// controllers/question.controller.js
const Question = require("../models/question.model");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.postNewQuestions = async (req, res) => {
  const { question } = req.body; // Lấy mảng câu hỏi từ đối tượng body
  const { point } = req.body;
  if (!Array.isArray(question) || question.length === 0) {
    return res.status(400).json({
      codeStatus: 400,
      message: "No questions provided",
    });
  }

  try {
    // Gọi phương thức trong Model để lưu dữ liệu vào database
    const result = await Question.postNewQuestions(question);
    if (point) {
      await query(
        `UPDATE quizzes
                  SET score = score + ${point}
                  WHERE quiz_id = ?;
                 `,
        [question[0]?.quiz_id]
      );
    }
    return res.status(201).json({
      codeStatus: 201,
      message: "Create new questions successful",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at creating questions: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.getQuestion = async (req, res) => {
  const quiz_id = req.params.id;

  // Check if quiz_id is valid
  if (!quiz_id || quiz_id === "") {
    return res.status(400).json({
      statusCode: 400,
      message: "ID Invalid",
    });
  }

  try {
    // Fetch questions from the database
    const questions = await Question.getQuestion(quiz_id);
    if (questions.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "No questions found",
      });
    }

    // Group questions and their options
    const groupedQuestions = {};
    questions.forEach((question) => {
      const {
        question_id,
        question_text,
        question_type,
        difficulty,
        option_id,
        option_text,
        is_correct,
      } = question;

      // If the question is not in the groupedQuestions, add it
      if (!groupedQuestions[question_id]) {
        groupedQuestions[question_id] = {
          question_id,
          question_text,
          question_type,
          difficulty,
          options: [],
        };
      }

      // Add the option to the question's options array
      groupedQuestions[question_id].options.push({
        option_id,
        option_text,
        is_correct,
      });
    });

    // Convert the groupedQuestions object to an array
    const result = Object.values(groupedQuestions);

    return res.status(200).json({
      statusCode: 200,
      data: result,
      message: "Get questions successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error getting questions: ${error.message}`,
      name: error.name,
    });
  }
};
