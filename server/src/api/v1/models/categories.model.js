const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Category = {
  createCategory: async (category_id, category_name, description) => {
    const sql_createCategory =
      "INSERT INTO categories (category_id, category_name, description) VALUES (?,?,?)";
    try {
      const result = await query(sql_createCategory, [
        category_id,
        category_name,
        description,
      ]);
      return result;
    } catch (error) {
      throw new Error(`ERROR: createCategory - ${error.message}`);
    }
  },
  findCategoryByName: async (category_name) => {
    const sql_check = "SELECT * FROM categories WHERE category_name = ?";
    try {
      const result = await query(sql_check, [category_name]);
      return result.length > 0;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  },
};
module.exports = Category;
