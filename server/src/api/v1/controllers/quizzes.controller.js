const Quizzes = require("../models/quizzes.model");
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
