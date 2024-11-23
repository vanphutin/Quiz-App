// controllers/question.controller.js
const Question = require("../models/question.model");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid"); // Dùng uuid để tạo ID tự động

module.exports.postNewQuestions = async (questions) => {
  // Sử dụng UUID để tạo ID cho mỗi câu hỏi
  const sql_postNewQuestion = `INSERT INTO questions (question_id, quiz_id, question_text, question_type, difficulty) VALUES ?`;

  const values = questions.map((q) => [
    uuidv4(), // Tạo ID tự động cho câu hỏi
    q.quiz_id, // Giữ nguyên quiz_id từ client (nếu cần)
    mysql.escape(q.question_text), // Escape dữ liệu
    mysql.escape(q.question_type), // Escape dữ liệu
    mysql.escape(q.difficulty), // Escape dữ liệu
  ]);

  try {
    // Thực hiện truy vấn thêm câu hỏi
    const result = await query(sql_postNewQuestion, [values]);

    // Lưu các câu trả lời cho mỗi câu hỏi
    const sql_postAnswer = `INSERT INTO options (option_id, option_text, is_correct, question_id) VALUES ?`;
    const answerValues = [];

    questions.forEach((q) => {
      q.answer.forEach((a) => {
        answerValues.push([
          uuidv4(), // Tạo ID tự động cho câu trả lời
          mysql.escape(a.option_text),
          mysql.escape(a.is_correct),
          q.question_id, // Sử dụng question_id đã được tạo
        ]);
      });
    });

    await query(sql_postAnswer, [answerValues]);

    return result;
  } catch (error) {
    console.error("Error in postNewQuestions:", error);
    throw error;
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
    const result = Object.values(groupedQuestions).sort(
      () => Math.random() - 0.5
    );
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
