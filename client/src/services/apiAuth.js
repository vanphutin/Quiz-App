import axios from "../utils/axiosConfig";

const AUTH_API = "auth";

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_API}/login`, { email, password });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${AUTH_API}/forgot-password`, { email });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
const verifyOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${AUTH_API}/verify-otp`, { email, otp });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const resetPassword = async (user_id, newPassword) => {
  try {
    const response = await axios.post(`${AUTH_API}/reset-password`, {
      user_id,
      newPassword,
    });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const singupUser = async (
  password,
  email,
  username,
  lastname,
  firstname,
  role,
  school,
  gender,
  code
) => {
  try {
    const response = await axios.post(`${AUTH_API}/register`, {
      password: password,
      email: email,
      username: username,
      lastname: lastname,
      firstname: firstname,
      role: role,
      school: school,
      gender: gender,
      code: code,
    });
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export { loginUser };
export { forgotPassword };
export { verifyOtp };
export { resetPassword };
export { singupUser };
