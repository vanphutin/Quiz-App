import React, { useContext, useEffect, useState } from "react";
import "../assets/style/pages/_ResultPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getQuizzes } from "../services/apiQuizzes";
import { postResult } from "../services/apiResult";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { IoIosInformationCircle } from "react-icons/io";
import { DataQuesContext } from "../context/DataQuesContext";
import { toast } from "react-toastify";

const ResultPage = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const level = localStorage.getItem("level");
  const { data, quizId, initMaxQuestion, titleQuiz } =
    useContext(DataQuesContext); // Lấy dữ liệu từ context
  const user = useSelector((state) => state.user.account);
  const doneCount = state?.results?.length;
  const notDoneCount = initMaxQuestion - doneCount;
  // console.log(data);
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

  // tính điểm cho bài quizzes

  const listAnswer = state?.results; // câu trả lời người dùng làm
  const listData = data; // toàn bộ câu hỏi
  // console.log(listData);
  // console.log(listAnswer);
  let countInCorrect = 0;
  function totalCountIncorrects(listAnswer, listData) {
    if (listData?.length <= 0) return;

    for (let i = 0; i < listAnswer?.length; i++) {
      if (listAnswer[i]?.questionIndex === listData[i]?.question_id) {
        const option_true = listData[i]?.options.find(
          (option) => option?.is_correct === 1
        );

        // console.log("Đáp án đúng:", option_true);
        // console.log("Câu trả lời của người dùng:", listAnswer[i]);

        if (listAnswer[i]?.answer !== option_true?.option_id) {
          countInCorrect++;
        }
      }
    }

    return countInCorrect;
  }
  totalCountIncorrects(listAnswer, listData);
  const point =
    countInCorrect > 0
      ? ((initMaxQuestion - countInCorrect) * 10).toFixed(1)
      : ((initMaxQuestion - notDoneCount) * 10).toFixed(1);

  // Tính số điểm thực nhận
  function actualPointsReceived(initialPoints, attempts) {
    const reductionPercentage = 0.1; // 10%
    let PointsReceived = initialPoints;
    if (attempts === 0) {
      return PointsReceived;
    }
    // Giảm điểm cho mỗi lần làm lại
    for (let i = 1; i <= attempts; i++) {
      PointsReceived *= 1 - reductionPercentage;
    }

    return PointsReceived.toFixed(2);
  }
  const finalPoints = actualPointsReceived(point, 5);
  useEffect(() => {
    if (quizId) {
      fetchApi(quizId, user?.user_id, finalPoints);
    }
  }, [quizId, user?.user_id, finalPoints]);

  const fetchApi = async (quiz_id, user_id, point) => {
    const res = await postResult(quiz_id, user_id, point);
    try {
      if (res.codeStatus !== 200) {
        return toast.error(
          "Unable to update score, please contact teacher or admin!"
        );
      }
      console.log(res);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <div className="container result-page mt-5">
      <h1 className="result-title text-center">
        Test results <span className="point text-white">point : {point}</span>
      </h1>
      <div className="result-details">
        <div className="result-item">
          <label>Full name</label>
          <h3>{user?.firstname + " " + user?.lastname || NaN}</h3>
        </div>
        <div className="result-item">
          <label>Test name</label>
          <h3>{titleQuiz || NaN}</h3>
        </div>
        <div className="result-item">
          <label>Total questions</label>
          <h3>{initMaxQuestion}</h3>
        </div>
        <div className="result-item">
          <label>Done</label>
          <h3 style={{ color: "rgb(0 246 132)" }}>{doneCount}</h3>
        </div>
        <div className="result-item">
          <label>Not done</label>
          <h3 style={{ color: "yellow" }}>{notDoneCount}</h3>
        </div>
        <div className="result-item">
          <label>Incorrect</label>
          <h3 style={{ color: "red" }}>{countInCorrect || notDoneCount}</h3>
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
          <h3 style={{ color: "rgb(0 246 132)" }}>{finalPoints || NaN} 🎉</h3>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
