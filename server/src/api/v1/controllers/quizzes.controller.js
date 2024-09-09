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
