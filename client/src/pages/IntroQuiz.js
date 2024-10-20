import React, { useContext, useEffect } from "react";
import "../assets/style/pages/__IntroQuiz.scss";
import { DataQuesContext } from "../context/DataQuesContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";

const IntroQuiz = () => {
  const formattedDate = new Date().toLocaleDateString();
  let { state } = useLocation();
  const navigate = useNavigate();
  const {
    dataQuestion,
    initMaxQuestion,
    titleQuiz,
    quizId,
    setQuizId,
    loading,
    error,
  } = useContext(DataQuesContext);
  useEffect(() => {
    if (state?.id) {
      setQuizId(state?.id);
    }
  }, [state?.id]);
  console.log("error", error);
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
              {error ? (
                <span className="status status--error"> failed</span>
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
            <h3>0</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Previous point</label>
            <h3>300</h3>
          </li>
          <li className="list-item">
            <label htmlFor="#">Total question</label>
            <h3>{initMaxQuestion || "----"}</h3>
          </li>
        </ul>
      </div>
      <div className="intro-quiz footer">
        <button
          disabled={loading}
          className="btn btn-primary btn-lg get-start"
          onClick={() => {
            if (!loading && !error) {
              navigate(`/quiz/${state?.id}`, { state: { id: state?.id } });
            }
          }}
        >
          {loading || error ? (
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

export default IntroQuiz;
