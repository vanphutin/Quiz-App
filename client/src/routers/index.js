import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../utils/ScrollToTop";
import ModalEnterEmail from "../components/ForgotPass/ModalEnterEmail";
import HeaderBackTo from "../components/common/HeaderBackTo/HeaderBackTo";
import FormEnterOTP from "../components/ForgotPass/FormEnterOTP";
import ModalEnterNewPass from "../components/ForgotPass/ModalEnterNewPass";
import SignUpPage from "../pages/SignUpPage";
const AuthLayout = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <HeaderBackTo />,
        children: [
          {
            element: <LoginPage />,
            path: "/login",
          },
          {
            element: <ModalEnterEmail />,
            path: "/recover/forgot",
          },
          {
            element: <FormEnterOTP />,
            path: "/recover/code",
          },
          {
            element: <ModalEnterNewPass />,
            path: "/recover/password",
          },
          {
            element: <SignUpPage />,
            path: "/sign-up",
          },
        ],
      },
    ],
  },
]);

export default router;
