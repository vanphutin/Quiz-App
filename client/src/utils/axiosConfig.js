import axios from "axios";
import NProgress from "nprogress"; // Chỉnh sửa tên import cho đồng nhất
import "nprogress/nprogress.css"; // Import stylesheet của nprogress

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  // timeout: 1000, // Có thể thêm nếu cần
  // headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } // Không cần thiết
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Thêm token vào headers của request
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    NProgress.done(); // Dừng thanh tiến trình khi có lỗi request
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response.data;
  },
  function (error) {
    NProgress.done(); // Dừng thanh tiến trình khi có lỗi response
    return Promise.reject(error);
  }
);

export default instance;
