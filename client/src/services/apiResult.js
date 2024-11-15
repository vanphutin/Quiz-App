import axios from "../utils/axiosConfig";
const RESULT_API = "result";
const postResult = (quiz_id, user_id, score) => {
  return axios.post(`${RESULT_API}`, { quiz_id, user_id, score });
};
const countQuizByUserID = (quiz_id, user_id) => {
  return axios.get(`${RESULT_API}`, { quiz_id, user_id });
};

const getAttempts = (user_id, quiz_id) => {
  return axios.get(
    `${RESULT_API}/count-attempts?user_id=${user_id}&quiz_id=${quiz_id}`
  );
};
const overview = (quiz_id, user_id) => {
  return axios.get(
    `${RESULT_API}/ovevivew?quiz_id=${quiz_id}&user_id=${user_id}`
  );
};

const submitAnswer = (user_id, quiz_id, answers) => {
  return axios.post(`${RESULT_API}/submit-answers`, {
    user_id,
    quiz_id,
    answers,
  });
};

export { submitAnswer };
export { postResult };
export { countQuizByUserID };
export { getAttempts };
export { overview };
