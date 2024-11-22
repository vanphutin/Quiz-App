import axios from "../utils/axiosConfig";
const CATEGORY_API = "category";

const postCategory = (category_name, description) => {
  return axios.post(`${CATEGORY_API}`, { category_name, description });
};

export { postCategory };
