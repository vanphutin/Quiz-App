import axios from "../utils/axiosConfig";

const ANSWER_API = "answer";

const postAnswer = (question_id, option_text, is_correct) => {
  return axios.post(`${ANSWER_API}/`, {
    question_id,
    option_text,
    is_correct,
  });
};

export { postAnswer };
