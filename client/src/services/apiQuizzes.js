import axios from "../utils/axiosConfig";

const QUIZZES_API = "quizzes";

const getAllQuizzLevel = () => {
  return axios.get(`${QUIZZES_API}/levels`);
};

const getQuizzes = (level, sort, page, limit) => {
  let url = `${QUIZZES_API}?`;
  if (level) {
    url += `level=${level}&`;
  }
  if (sort) {
    url += `sort=${sort}&`;
  }

  // Xóa '&' cuối nếu cần thiết
  url = url.endsWith("&") ? url.slice(0, -1) : url;
  return axios.get(url);
};

export { getAllQuizzLevel };
export { getQuizzes };
