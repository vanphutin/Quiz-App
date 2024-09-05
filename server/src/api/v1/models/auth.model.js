const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Auth = {
  // Find user by ID
  findById: async (user_id) => {
    const sql_findById = "SELECT * FROM users WHERE user_id = ?";
    try {
      const result = await query(sql_findById, [user_id]);
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
      if (result?.length === 0) {
        return false; // User does not exist
      }

      const hashedPassword = result?.password;
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
  //====START FORGOT PASSWORD====
  forgotPassword: async (email) => {
    const sql_forgotPassword =
      "SELECT user_id, lastname, firstname FROM users WHERE email = ?";
    try {
      const result = await query(sql_forgotPassword, [email]);

      if (result.length === 0) {
        throw new Error("No result found for email check");
      }
      return result[0];
    } catch (error) {
      throw new Error(`ERROR: forgot password - ${error.message}`);
    }
  },
  verifyOtp: async (otp, email) => {
    const sql_verifyOtp = `SELECT u.user_id
          FROM users u
          JOIN otp_requests o ON u.user_id = o.user_id
          WHERE u.email=?
          AND o.otp_code =?
          AND o.expiration_at > NOW()`;
    try {
      const result = await query(sql_verifyOtp, [email, otp]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: Otp Verify - ${error.message}`);
    }
  },
  //reset password
  resetPassword: async (user_id, newPassword) => {
    console.log("newPassword", newPassword);

    const sql_resetPassword = "UPDATE users SET password=? WHERE user_id=?";
    try {
      const result = await query(sql_resetPassword, [newPassword, user_id]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: reset password - ${error.message}`);
    }
  },
  //====END FORGOT PASSWORD====

  //=== START REGISTER====
  checkUserNameExists: async (username) => {
    const sql_checkUserNameExists =
      "SELECT COUNT(*) AS count FROM users WHERE username = ?";
    try {
      const [result] = await query(sql_checkUserNameExists, [username]);
      if (result.length === 0) {
        throw new Error("No result found for username check");
      }
      return result.count > 0;
    } catch (error) {
      console.error("Error in checkUserNameExists:", error); // Logging error for debugging
      throw error;
    }
  },
  register: async (
    user_id,
    username,
    email,
    lastname,
    firstname,
    role,
    school,
    gender,
    password
  ) => {
    const sql_register =
      "INSERT INTO users (user_id, username, email, lastname, firstname, role, school, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      const result = await query(sql_register, [
        user_id,
        username,
        email,
        lastname,
        firstname,
        role,
        school,
        gender,
        password,
      ]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: register - ${error.message}`);
    }
  },
  //=== END REGISTER====
};

module.exports = Auth;
