const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const User = {
  getUserById: async (user_id) => {
    const sql_getUserById = "SELECT * FROM users WHERE user_id = ?";
    try {
      const result = await query(sql_getUserById, [user_id]);
      console.log([result]);

      return result[0];
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;
    }
  },
  updateUser: async (lastname, firstname, email, school, user_id) => {
    const sql_updateUser =
      "UPDATE users SET lastname = ?, firstname = ?, email = ?, school = ? WHERE user_id = ?";

    try {
      // Execute the query with parameters
      const result = await query(sql_updateUser, [
        lastname,
        firstname,
        email,
        school,
        user_id,
      ]);

      return result;
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  },
};
module.exports = User;
