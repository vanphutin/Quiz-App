const Ranking = require("../models/ranking.model");
const { v4: uuidv4 } = require("uuid");

module.exports.getRanking = async (req, res) => {
  const { id } = req.params;

  try {
    // Lấy danh sách xếp hạng từ cơ sở dữ liệu
    const ranking = await Ranking.getRanking();

    // Sắp xếp theo điểm tổng và tính thứ hạng
    const sortedRanking = ranking.sort((a, b) => b.total_score - a.total_score);

    // Thêm thuộc tính ranking vào mỗi đối tượng trong danh sách
    const rankedUsers = sortedRanking.map((user, index) => ({
      ...user,
      rank: index + 1, // Thứ hạng là chỉ số + 1
    }));

    // Tìm thứ hạng của người dùng hiện tại
    const myRank = rankedUsers.find((rank) => rank.user_id === id);

    return res.status(200).json({
      statusCode: 200,
      data: {
        ranks: rankedUsers, // Danh sách đã có thứ hạng
        myRank: myRank || null, // Thứ hạng của người dùng hiện tại
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
