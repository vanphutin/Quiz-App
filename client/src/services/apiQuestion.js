import axios from "../utils/axiosConfig";

const QUESTION_API = "question";

const postQuestion = (question, point) => {
  return axios.post(`${QUESTION_API}/`, {
    question,
    point,
  });
};

const getQuestionById = (id) => {
  return axios.get(`${QUESTION_API}/${id}`);
};

export { postQuestion };
export { getQuestionById };
