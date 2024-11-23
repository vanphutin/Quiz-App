const Ranking = require("../models/ranking.model");
const { v4: uuidv4 } = require("uuid");

module.exports.getRanking = async (req, res) => {
  const { id } = req.params;

  try {
    const ranking = await Ranking.getRanking();
    const myRank = ranking.find((rank) => rank.user_id === id); // Use .find() to get a single object
    // Send JSON response with correctly formatted data
    return res.status(200).json({
      statusCode: 200,
      data: {
        ranks: ranking,
        myRank: myRank || null, // Return null if no match is found
      },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: `Error at result: ${error.message}`,
      name: error.name,
    });
  }
};
