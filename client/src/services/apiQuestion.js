import axios from "../utils/axiosConfig";

const QUESTION_API = "question";

const postQuestion = (question) => {
  return axios.post(`${QUESTION_API}/`, {
    question,
  });
};

export { postQuestion };
