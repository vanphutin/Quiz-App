import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // chuyển đổi thành giây
    return decoded.exp < currentTime; // nếu thời gian hiện tại vượt quá thời gian hết hạn, trả về true
  } catch (error) {
    return true; // token không hợp lệ
  }
};

export default isTokenExpired;
