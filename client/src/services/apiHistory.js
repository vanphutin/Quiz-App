import axios from "../utils/axiosConfig";
const HISTORY_API = "history";

const getHistory = (user_id, search) => {
  let url = `${HISTORY_API}?user_id=${user_id}&`;
  if (search) {
    url += `search=${search}&`;
  }
  // Xóa '&' cuối nếu cần thiết
  url = url.endsWith("&") ? url.slice(0, -1) : url;
  return axios.get(url);
};

export { getHistory };
