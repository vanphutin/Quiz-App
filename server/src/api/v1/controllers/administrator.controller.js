const Administrator = require("../models/administrator.model");

module.exports.getUsers = async (req, res) => {
  const sort = req.query.sort;

  // Phân trang
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    // Lấy tổng số người dùng để tính toán phân trang
    const totalUsers = await Administrator.countUsers();

    // Lấy danh sách người dùng cho trang hiện tại
    const users = await Administrator.getUsers(limit, offset, sort);

    if (totalUsers === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "No users found",
        userCount: totalUsers,
        data: [],
        pagination: {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: users.length,
        },
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get all users successful",
      name: "users",
      data: users,
      userCount: totalUsers,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: users.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at administrator: ${error.message}`,
      name: error.name,
    });
  }
};
module.exports.getQuizzes = async (req, res) => {
  // Phân trang
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const userID = req.query.user;

  try {
    const totalQuiz = await Administrator.countQuiz();
    // Lấy danh sách quiz cho trang hiện tại
    const quiz = await Administrator.getQuiz(limit, offset, userID);

    if (totalQuiz === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "No quiz found",
        quizCount: totalQuiz,
        data: [],
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Get all quizzes successful",
      name: "quiz",
      data: quiz,
      quizCount: totalQuiz,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: quiz.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at administrator: ${error.message}`,
      name: error.name,
    });
  }
};

// get quiz by id

//đếm số lượng tổng câu hỏi

module.exports.countQuestion = async (req, res) => {
  try {
    const question = await Administrator.countQuestion();
    if (question === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "No question found",
        questionCount: totalUsers,
        name: "question",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Get all questions successful",
      questionCount: question,
      name: "question",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at administrator: ${error.message}`,
      name: error.name,
    });
  }
};
module.exports.countCategories = async (req, res) => {
  try {
    const categorie = await Administrator.countCategories();
    if (categorie === 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "No categories found",
        categorieCount: categorie,
        name: "categories",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "Get all categories successful",
      categorieCount: categorie,
      name: "categories",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at administrator: ${error.message}`,
      name: error.name,
    });
  }
};

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Administrator.getCategories();
    if (categories.length <= 0) {
      return res.status(200).json({
        statusCode: 200,
        message: "No categories found",
        categorieCount: categorie,
        name: "categories",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "get categories successful",
      data: categories,
      name: "categories",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at administrator: ${error.message}`,
      name: error.name,
    });
  }
};
