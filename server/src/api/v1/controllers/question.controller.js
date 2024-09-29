// controllers/question.controller.js
const Question = require("../models/question.model");

module.exports.postNewQuestions = async (req, res) => {
  const { question } = req.body; // Lấy mảng câu hỏi từ đối tượng body

  console.log(question); // Kiểm tra cấu trúc dữ liệu

  if (!Array.isArray(question) || question.length === 0) {
    return res.status(400).json({
      codeStatus: 400,
      message: "No questions provided",
    });
  }

  try {
    // Gọi phương thức trong Model để lưu dữ liệu vào database
    const result = await Question.postNewQuestions(question);
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
