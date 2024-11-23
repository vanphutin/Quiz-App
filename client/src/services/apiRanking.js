import axios from "../utils/axiosConfig";
const RANKING_API = "ranking";

const getRanking = async (user_id) => {
  // Default to '123' if user_id is an empty string, undefined, or null
  if (!user_id || typeof user_id === "undefined" || user_id === null) {
    user_id = "123";
  }

  // Make the GET request with the interpolated user_id
  return axios.get(`${RANKING_API}/${user_id}`);
};

export default getRanking;
