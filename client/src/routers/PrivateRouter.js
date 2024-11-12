import { useSelector } from "react-redux";

const PrivateRouter = ({ roleRequired }) => {
  // Lấy thông tin người dùng từ store
  const user = useSelector((state) => state.user.account);

  // Kiểm tra quyền
  return user && (user.role === roleRequired || user.role === "instructor");
};

export default PrivateRouter;
