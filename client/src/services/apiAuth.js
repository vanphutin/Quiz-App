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

export { loginUser };
