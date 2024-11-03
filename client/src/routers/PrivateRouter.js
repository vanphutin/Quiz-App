import { useSelector } from "react-redux";

const PrivateRouter = (roleRequired) => {
  // Lấy thông tin người dùng từ localStorage hoặc context
  const user = useSelector((state) => state.user.account);
  console.log(user);
  // Kiểmuser tra quyền
  return user && user.role === roleRequired;
};

export default PrivateRouter;
