import React, { useContext, useEffect, useState } from "react";
import "../assets/style/pages/_ResultPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuizzes } from "../services/apiQuizzes";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { IoIosInformationCircle } from "react-icons/io";

const ResultPage = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const level = localStorage.getItem("level");
  const user = useSelector((state) => state.user.account);
  const res = state?.res?.data;
  const titleQuiz = state?.titleQuiz;
  useEffect(() => {
    // Thêm trạng thái mới vào history để ngăn người dùng quay lại trang trước
    window.history.pushState(null, null, window.location.href);

    const handleBackButton = async () => {
      if (level) {
        try {
          const res = await getQuizzes(level);
          if (res.statusCode === 200) {
            navigate(`/quiz?level=${level}`, {
              state: { dataQuizzes: res.data },
            });
            localStorage.setItem("level", level);
          } else {
            console.log("Error fetching quizzes");
          }
        } catch (error) {
          console.error("Error during API call:", error);
          handleErrorResponse(error);
          throw new Error(error);
        }
      } else {
        navigate("/");
      }
    };

    // Lắng nghe sự kiện popstate (xảy ra khi nhấn nút back)
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton); // Cleanup khi component unmount
    };
  }, [navigate, level]);

  return (
    <div className="container result-page mt-5">
      <h1 className="result-title text-center">
        Test results{" "}
        {/* <span className="point text-white">
          max point : {res?.totalQuesPoint}
        </span> */}
      </h1>
      <div className="result-details">
        <div className="result-item">
          <label>Full name</label>
          <h3>{user?.firstname + " " + user?.lastname || NaN}</h3>
        </div>
        <div className="result-item">
          <label>Test name</label>
          <h3>{titleQuiz}</h3>
        </div>
        <div className="result-item">
          <label>Total questions</label>
          <h3>{res?.totalQues}</h3>
        </div>
        <div className="result-item">
          <label>Done</label>
          <h3 style={{ color: "rgb(0 246 132)" }}>{res?.totalDone}</h3>
        </div>
        <div className="result-item">
          <label>Not done</label>
          <h3 style={{ color: "yellow" }}>{res?.totalNotDone}</h3>
        </div>
        <div className="result-item">
          <label>Incorrect</label>
          <h3 style={{ color: "red" }}>{res?.inCorrect}</h3>
        </div>
        <div
          className="result-item"
          data-toggle="tooltip"
          data-placement="top"
          title="The score will decrease by 10% for each retake of the test."
        >
          <label>
            Actual points received <IoIosInformationCircle size={30} />
          </label>
          <h3 style={{ color: "rgb(0 246 132)" }}>{res?.PointsReceived} 🎉</h3>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
