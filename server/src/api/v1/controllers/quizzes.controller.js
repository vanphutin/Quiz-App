const Quizzes = require("../models/quizzes.model");
const { v4: uuidv4 } = require("uuid");

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
  const search = req.query.search;
  const sort = req.query.sort || "asc";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1000;
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

    const filteredQuiz = search
      ? formattedData.map((category) => ({
          quizzes: category.quizzes.filter((quiz) =>
            quiz.title.toLowerCase().includes(search.toLowerCase())
          ),
        }))
      : formattedData;

    res.status(200).json({
      statusCode: 200,
      message: `Get quizzes for level: ${level} successful`,
      data: filteredQuiz,
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

module.exports.createNewQuiz = async (
  title,
  description,
  created_by_user_id,
  category_id,
  level
) => {
  const quiz_id = uuidv4(); // Tạo ID tự động cho quiz
  const sql_createNewQuiz = `
    INSERT INTO quizzes (quiz_id, title, description, created_by_user_id, category_id, level, created_at, updated_at, is_deleted, score)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 0, 100.00);
  `;

  try {
    // Escape dữ liệu và sử dụng quiz_id tự tạo
    const result = await query(sql_createNewQuiz, [
      mysql.escape(quiz_id),
      mysql.escape(title),
      mysql.escape(description),
      mysql.escape(created_by_user_id),
      mysql.escape(category_id),
      mysql.escape(level),
    ]);
    return result;
  } catch (error) {
    console.error("SQL Error:", error); // Log toàn bộ lỗi để debug
    throw new Error(`ERROR: create new quiz - ${error.message}`);
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
