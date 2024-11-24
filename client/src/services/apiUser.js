import axios from "../utils/axiosConfig";
const USER_API = "user";

const updateUser = (lastname, firstname, email, school, user_id) => {
  return axios.put(`${USER_API}`, {
    lastname,
    firstname,
    email,
    school,
    user_id,
  });
};
export { updateUser };
