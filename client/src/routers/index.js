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
import HeaderPage from "../pages/HeaderPage";
import { getAllQuizzLevel } from "../services/apiQuizzes";
import QuizPage from "../pages/QuizPage";
import AdminPage from "../pages/AdminPage";
import QuestionPage from "../pages/QuestionPage";
import ResultPage from "../pages/ResultPage";
import OverviewQuiz from "../pages/OverviewQuiz";

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
        element: <HeaderPage />,
        children: [
          {
            element: <HomePage />,
            path: "/",
            loader: async () => {
              const res = await getAllQuizzLevel();
              const levelOrder = ["easy", "medium", "hard"];
              return res.data.sort((a, b) => {
                return (
                  levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
                );
              });
            },
          },
          {
            element: <QuizPage />,
            path: "/quiz",
          },
          {
            element: <ResultPage />,
            path: "/quiz/result",
          },
          {
            element: <OverviewQuiz />,
            path: "/quiz/overview",
          },
          {
            element: <QuestionPage />,
            path: "/quiz/:id",
          },
        ],
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
          {
            element: <AdminPage />,
            path: "/admin",
          },
        ],
      },
    ],
  },
]);

export default router;
