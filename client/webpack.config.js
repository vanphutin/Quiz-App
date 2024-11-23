const path = require("path");

module.exports = {
  mode: "production", // Dùng 'production' để tối ưu và làm mờ mã
  entry: "./src/index.js", // File gốc của bạn
  output: {
    filename: "bundle.js", // File đầu ra
    path: path.resolve(__dirname, "dist"),
  },
};
