const { v4: uuidv4 } = require("uuid");
const Category = require("../models/categories.model");

module.exports.getCategory = async (req, res) => {
  const { category_name, description } = req.body;

  const category_id = uuidv4();
  if (!category_name || !description) {
    return res.status(404).json({
      codeStatus: 404,
      message: "Missing category name or description ",
    });
  }
  try {
    const checkExist = await Category.findCategoryByName(category_name);
    if (checkExist) {
      return res.status(404).json({
        codeStatus: 404,
        message: "Category exist ",
      });
    }
    const category = await Category.createCategory(
      category_id,
      category_name,
      description
    );

    return res.status(200).json({
      codeStatus: 200,
      message: "Create new category",
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: `Error at answer: ${error.message}`,
      name: error.name,
    });
  }
};
