module.exports.test = async (req, res) => {
  res.status(200).json({
    codeStatus: 200,
    data: "ok",
  });
};
