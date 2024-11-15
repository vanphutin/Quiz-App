import axios from "../utils/axiosConfig";
const ADMIN_API = "administrator";

const getUsers = (page, limit, sort) => {
  let url = `${ADMIN_API}/users?`;

  if (sort) {
    url += `sort=${sort}&`;
  }
  if (page && limit) {
    url += `page=${page}&limit=${limit}`;
  }
  // Xóa '&' cuối nếu cần thiết
  url = url.endsWith("&") ? url.slice(0, -1) : url;
  return axios.get(url);
};
const getQuiz = (page, limit, sort, user) => {
  let url = `${ADMIN_API}/quizzes?`;

  if ((page && limit, sort)) {
    url += `page=${page}&limit=${limit}&`;
  }
  if (user) {
    url += `user=${user}`;
  }

  // Xóa '&' cuối nếu cần thiết
  url = url.endsWith("&") ? url.slice(0, -1) : url;
  return axios.get(url);
};

const getQuestion = () => {
  return axios.get(`${ADMIN_API}/questions/total`);
};
const getCategorieTotal = () => {
  return axios.get(`${ADMIN_API}/categories/total`);
};
const getCategorie = () => {
  return axios.get(`${ADMIN_API}/categories`);
};
const patchDeleteUserByID = (user_id) => {
  return axios.patch(`${ADMIN_API}/users/${user_id}`);
};
export { getUsers };
export { getQuiz };
export { getQuestion };
export { getCategorieTotal };
export { getCategorie };
export { patchDeleteUserByID };
