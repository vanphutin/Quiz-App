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
    // Lấy quiz theo cấp độ
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

    // Xử lý và chuyển đổi chuỗi JSON trong trường quizzes thành đối tượng JSON
    const groupedQuizzes = quizzesByCategory.map((category) => {
      try {
        // In ra dữ liệu quizzes trước khi phân tích
        // console.log(
        //   "Quizzes data for category:",
        //   category.category_name,
        //   category.quizzes
        // );

        // Kiểm tra và chuyển đổi quizzes từ chuỗi JSON thành đối tượng JSON
        category.quizzes = JSON.parse(category.quizzes);

        // Nếu quizzes không phải là mảng, biến thành mảng
        if (!Array.isArray(category.quizzes)) {
          category.quizzes = [category.quizzes];
        }
      } catch (error) {
        // Nếu lỗi xảy ra khi phân tích JSON, ghi lại lỗi và chuỗi gây lỗi
        console.error("Error parsing JSON for category:");
        console.error("Error details:", error);
        console.error("Invalid JSON string:");

        category.quizzes = JSON.parse("[" + category.quizzes + "]"); // Đảm bảo luôn tạo thành mảng
      }

      return category;
    });

    // Trả về kết quả
    res.status(200).json({
      statusCode: 200,
      message: `Get quizzes for level: ${level} successful`,
      data: groupedQuizzes,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: quizzesByCategory.length,
      },
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "An error occurred while fetching quizzes",
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
  const quiz_id = uuidv4();
  try {
    const createQuiz = await Quizzes.createNewQuiz(
      quiz_id,
      title.trim(),
      description.trim(),
      created_by_user_id.trim(),
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
