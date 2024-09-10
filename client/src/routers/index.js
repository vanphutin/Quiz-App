import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../utils/ScrollToTop";
import HeaderPage from "../pages/HeaderPage";
import { getAllQuizzLevel } from "../services/apiQuizzes";
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
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <HeaderPage />,
        children: [
          {
            element: <HomePage />,
            path: "/",
            loader: async () => {
              const res = await getAllQuizzLevel();
              return res.data;
            },
          },
        ],
      },
    ],
  },
]);

export default router;
