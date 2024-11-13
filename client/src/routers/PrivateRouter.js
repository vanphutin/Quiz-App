import { useSelector } from "react-redux";

const PrivateRouter = (allowedRoles) => {
  // Lấy thông tin người dùng từ Redux store
  const user = useSelector((state) => state.user.account);
  console.log(user);

  // Kiểm tra quyền
<<<<<<< HEAD
  return user && allowedRoles.includes(user.role);
=======
  return user && (user.role === "admin" || user.role === "instructor");
>>>>>>> feature/about-page
};

export default PrivateRouter;
