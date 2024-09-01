const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Auth = {
  // Find user by ID
  findById: async (user_id) => {
    const sql_findById = "SELECT * FROM users WHERE user_id = ?";
    try {
      const [result] = await query(sql_findById, [user_id]);
      return result.length > 0 ? result[0] : null; // Trả về đối tượng người dùng hoặc null
    } catch (error) {
      throw new Error("ERROR: findById", error);
    }
  },

  //====START LOGIN====
  // Check if email exists
  checkEmailExists: async (email) => {
    const sql_checkEmailExists =
      "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    try {
      const [result] = await query(sql_checkEmailExists, [email]);
      if (result.length === 0) {
        throw new Error("No result found for email check");
      }
      return result.count > 0;
    } catch (error) {
      console.error("Error in checkEmailExists:", error); // Logging error for debugging
      throw error;
    }
  },

  // Check password validity
  checkPasswordValid: async (email, password) => {
    const sql_checkPassword = "SELECT password FROM users WHERE email = ?";
    try {
      const [result] = await query(sql_checkPassword, [email]);

      // Ensure the user exists and has a password
      if (result.length === 0) {
        return false; // User does not exist
      }

      const hashedPassword = result.password;
      const inputHashedPassword = Auth.hashPassword(password);

      // Compare the input password with the stored hashed password
      return inputHashedPassword === hashedPassword;
    } catch (error) {
      console.error("ERROR: checkPasswordValid", error);
      throw error;
    }
  },

  // Hash password using MD5
  hashPassword: (password) => {
    const crypto = require("crypto");
    return crypto.createHash("md5").update(password).digest("hex");
  },

  // Login function
  login: async (email, password) => {
    const sql_login = "SELECT * FROM users WHERE email = ? AND password = ?";
    try {
      const result = await query(sql_login, [
        email,
        Auth.hashPassword(password),
      ]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw new Error("ERROR: login", error);
    }
  },
  //====END LOGIN====
};

module.exports = Auth;
