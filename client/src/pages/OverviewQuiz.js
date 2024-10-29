import React, { useContext, useEffect, useState } from "react";
import "../assets/style/pages/__IntroQuiz.scss";
import { DataQuesContext } from "../context/DataQuesContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";

const OverviewQuiz = () => {
  const formattedDate = new Date().toLocaleDateString();
  let { state } = useLocation();
  const user = useSelector((state) => state.user.account);

  const navigate = useNavigate();

  const {
    dataQuestion,
    initMaxQuestion,
    titleQuiz,
    quizId,
    setError,
    setQuizId,
    loading,
    error,
    attempt,
    scoreQuiz,
    updateAttempt,
  } = useContext(DataQuesContext);

  useEffect(() => {
    if (state?.id) {
      setQuizId(state?.id);
    }
    updateAttempt(user?.user_id, state?.id);
  }, [state?.id]);

  const handleStartQuiz = async () => {
    if (attempt >= 11) {
      // Hiển thị thông báo lỗi rõ ràng hơn
      alert("Bạn đã hết lượt làm bài!");
      return;
    }

    if (!loading && !error) {
      navigate(`/quiz/${state?.id}`, { state: { id: state?.id } });
    }
  };
  return (
    <div className="intro-quiz container mt-4">
      <div className="intro-quiz main">
        <h1 className="title text-center">Overview</h1>
      </div>
      <div className="intro-quiz body">
        <ul className="body-list">
          <li className="list-item">
            <label htmlFor="#">Test name</label>
            <h3>{state?.title.toUpperCase() || NaN}</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Status</label>
            <h3>
              {error || attempt > 10 ? (
                <span className="status status--error">
                  {" "}
                  failed | {error || "has reached the limit"}
                </span>
              ) : (
                <span className="status status--success"> ready</span>
              )}
            </h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Date</label>
            <h3>{formattedDate}</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Timer</label>
            <h3>{error ? "----" : "25s / 1 question"}</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Have done</label>
            <h3 style={attempt?.toString() > 10 ? { color: "red" } : {}}>
              {attempt || 0}
            </h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Previous point</label>
            <h3>{scoreQuiz || 0}</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Total question</label>
            <h3>{initMaxQuestion || "----"}</h3>
          </li>
        </ul>
      </div>
      <div className="intro-quiz footer">
        <button
          className="btn btn-primary btn-lg get-start"
          disabled={loading || error || attempt >= 11} // Vô hiệu hóa nút khi loading, error, hoặc hết lượt
          onClick={handleStartQuiz}
        >
          {loading || error || attempt > 10 ? (
            <span style={{ color: "red", cursor: "no-drop" }}>
              <MdOutlineNoEncryptionGmailerrorred size={30} />
              {""}
            </span>
          ) : (
            <span>Get start</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default OverviewQuiz;
