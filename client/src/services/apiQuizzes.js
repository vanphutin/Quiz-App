import axios from "../utils/axiosConfig";

const QUIZZES_API = "quizzes";

const getAllQuizzLevel = () => {
  return axios.get(`${QUIZZES_API}/levels`);
};

export { getAllQuizzLevel };
