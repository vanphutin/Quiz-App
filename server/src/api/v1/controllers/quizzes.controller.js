const Quizzes = require("../models/quizzes.model");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");

module.exports.getLevels = async (req, res) => {
  try {
    const levels = await Quizzes.getLevels();
    if (!levels) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Get all levels successful",
      data: levels,
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at quizzes: ${error.message}`,
      name: error.name,
    });
  }
};

// Yêu cầu: GET /quizzes?level=easy&page=1&limit=2&sort=asc
module.exports.getQuizzesLevel = async (req, res) => {
  const level = req.query.level;
  const sort = req.query.sort || "asc";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  if (!level) {
    return res.status(400).json({
      statusCode: 400,
      message: "Level query parameter is missing",
    });
  }

  const validSortValues = ["asc", "desc"];
  if (!validSortValues.includes(sort.toLowerCase())) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid sort parameter. Use 'asc' or 'desc'.",
    });
  }

  try {
    const quizzesByCategory = await Quizzes.getQuizzesLevel(
      level,
      sort,
      limit,
      offset
    );
    if (quizzesByCategory.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: `No quizzes found for level: ${level}`,
      });
    }
    const formattedData = quizzesByCategory.map((item) => ({
      category_name: item.category_name,
      quizzes: JSON.parse(`[${item.quizzes}]`),
    }));
    res.status(200).json({
      statusCode: 200,
      message: `Get quizzes for level: ${level} successful`,
      data: formattedData,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: quizzesByCategory.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at quizzes: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.createNewQuiz = async (req, res) => {
  const { title, description, created_by_user_id, category_id, level } =
    req.body;

  const valid = [
    "title",
    "description",
    "created_by_user_id",
    "category_id",
    "level",
  ];
  const init_level = ["easy", "medium", "hard"];

  // Check if title is one of the valid levels
  if (!init_level.includes(level)) {
    return res.status(400).json({
      statusCode: 400,
      message: `Invalid level. Level must be one of: ${init_level.join(", ")}`,
    });
  }

  // Check if all required fields are present in req.body
  for (let i = 0; i < valid.length; i++) {
    if (!req.body[valid[i]]) {
      // Check if the field is missing or undefined
      return res.status(400).json({
        statusCode: 400,
        message: `Missing required field: ${valid[i]}`,
      });
    }
  }

  // Convert title and description to lowercase
  const formattedTitle = title.toLowerCase();
  const formattedDescription = description.toLowerCase();

  const quiz_id = uuidv4();
  try {
    const createQuiz = await Quizzes.createNewQuiz(
      quiz_id,
      formattedTitle,
      formattedDescription,
      created_by_user_id,
      category_id,
      level
    );

    res.status(201).json({
      statusCode: 201,
      message: "Create quiz successful",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at quizzes: ${error.message}`,
      name: error.name,
    });
  }
};

// delete quiz

module.exports.deleteQuiz = async (req, res) => {
  const quiz_id = req.params.id;

  if (!quiz_id) {
    return res.status(400).json({
      statusCode: 400,
      message: "ID Invalid",
    });
  }
  try {
    const quiz_d = await Quizzes.deleteQuiz(quiz_id);
    if (!quiz_d) {
      return res.status(400).json({
        statusCode: 400,
        message: "Don't delete this quiz ",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Delete quiz successful",
      code: "DELETE_QUIZ",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at quizzes: ${error.message}`,
      name: error.name,
    });
  }
};
