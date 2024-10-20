import axios from "../utils/axiosConfig";
const RESULT_API = "result";
const postResult = (quiz_id, user_id, score) => {
  return axios.post(`${RESULT_API}`, { quiz_id, user_id, score });
};
const countQuizByUserID = (quiz_id, user_id) => {
  return axios.get(`${RESULT_API}`, { quiz_id, user_id });
};
export { postResult };
export { countQuizByUserID };
