import axios from "../utils/axiosConfig";

const ANSWER_API = "answer";

const postAnswer = (question_id, option_text, is_correct) => {
  return axios.post(`${ANSWER_API}/`, {
    question_id,
    option_text,
    is_correct,
  });
};

const submitAnswer = (user_id, quiz_id, answers) => {
  return axios.post(`${ANSWER_API}/submit-answers`, {
    user_id,
    quiz_id,
    answers,
  });
};

export { postAnswer };
export { submitAnswer };
