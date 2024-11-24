const User = require("../models/user.model");

module.exports.getUserById = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(404).json({
      codeStstus: 404,
      message: "Missing require user id",
    });
  }
  try {
    const user = await User.getUserById(id);
    if (!user || user.length <= 0) {
      return res.status(404).json({
        codeStatus: 404,
        message: "User not foud",
      });
    }
    console.log("user", user);

    return res.status(200).json({
      message: "Get user succesful",
      data: [
        {
          userid: user.user_id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          school: user.school,
          email: user.email,
          gender: user.gender,
          avatar: user.avatar,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      codeStatus: 500,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { lastname, firstname, email, school, user_id } = req.body;

  // Array of required fields to check
  const initField = ["lastname", "firstname", "email", "school", "user_id"];

  // Validate if all required fields are provided
  for (const field of initField) {
    if (!req.body[field]) {
      return res.status(400).json({
        codeStatus: 400,
        message: `Missing required field: ${field}`,
      });
    }
  }

  try {
    // Assuming User.updateUser is a function that updates user data
    const user = await User.updateUser(
      lastname,
      firstname,
      email,
      school,
      user_id
    );

    if (!user) {
      // If no user was updated, return server error
      return res.status(500).json({
        codeStatus: 500,
        message: "Error at server: User update failed",
      });
    }

    // Return success response if user is successfully updated
    return res.status(200).json({
      codeStatus: 200,
      message: "User updated successfully",
    });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      codeStatus: 500,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
};
