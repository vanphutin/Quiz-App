import { useSelector } from "react-redux";

const PrivateRouter = (allowedRoles) => {
  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.user.account);

  // Kiểm tra quyền
  return user && allowedRoles.includes(user.role);
};

export default PrivateRouter;
