import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  // timeout: 1000, // Có thể thêm nếu cần
  // headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } // Không cần thiết
});

instance.interceptors.request.use(
  function (config) {
    // Thêm token vào headers của request
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Xử lý dữ liệu phản hồi trước khi trả về
    return response.data;
  },
  function (error) {
    // Xử lý lỗi phản hồi
    return Promise.reject(error);
  }
);

export default instance;
