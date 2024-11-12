const History = require("../models/history.model");
const { v4: uuidv4 } = require("uuid");
const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.geHistory = async (req, res) => {
  const { user_id, search } = req.query;
  if (!user_id) {
    return res.status(400).json({
      codeStatus: 400,
      message: "Missing require user_id !",
    });
  }
  try {
    const history = await History.getHistory(user_id);
    if (!history || history.length === 0) {
      return res.status(400).json({
        codeStatus: 400,
        message: "No found ",
      });
    }
    const filteredHistory = search
      ? history.filter((entry) =>
          entry.title.toLowerCase().includes(search.toLowerCase())
        )
      : history;

    const resultStore = filteredHistory.sort((a, b) => {
      return new Date(b.completion_date) - new Date(a.completion_date);
    });

    return res.status(200).json({
      codeStatus: 200,
      data: resultStore,
      message: "Get history successful",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at History: ${error.message}`,
      name: error.name,
    });
  }
};
