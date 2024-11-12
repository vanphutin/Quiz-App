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
import RankPage from "../pages/RankPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRouter from "./PrivateRouter";
import HistoryPage from "../pages/HistoryPage";

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

const ProtectedRoute = ({ children, role }) => {
  return PrivateRouter(role) ? children : <NotFoundPage />;
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
            element: <RankPage />,
            path: "/rank",
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
          {
            element: <HistoryPage />,
            path: "/me/history-quiz",
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
            element: (
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            ),
            path: "/admin",
          },
        ],
      },
      {
        element: <NotFoundPage />,
        path: "*",
      },
    ],
  },
]);

export default router;
