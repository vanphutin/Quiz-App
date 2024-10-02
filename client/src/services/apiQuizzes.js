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

const postQuiz = (
  title,
  category_id,
  description,
  level,
  created_by_user_id
) => {
  return axios.post(`${QUIZZES_API}`, {
    title,
    category_id,
    description,
    level,
    created_by_user_id,
  });
};
const deleteQuiz = (quiz_id) => {
  return axios.put(`${QUIZZES_API}/${quiz_id}`);
};
export { getAllQuizzLevel };
export { getQuizzes };
export { postQuiz };
export { deleteQuiz };
