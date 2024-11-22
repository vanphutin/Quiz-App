import React, { useContext, useEffect, useState } from "react";
import "../assets/style/pages/__IntroQuiz.scss";
import { DataQuesContext } from "../context/DataQuesContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import { useSelector } from "react-redux";
import { overview } from "../services/apiResult";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { toast } from "react-toastify";

const OverviewQuiz = () => {
  const formattedDate = new Date().toLocaleDateString();
  let { state } = useLocation();
  const user = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { loading, setQuizId } = useContext(DataQuesContext);

  // kiem tra quyen
  useEffect(() => {
    if (data.attempts > 10) {
      setError("LIMITED");
    } else if (!user.user_id) {
      if (!data || data.length === 0) {
        setError("NO LOGIN");
      }
    }
  }, [user.user_id, data]);

  const handleStartQuiz = async () => {
    if (data.attempts >= 11) {
      // Hiển thị thông báo lỗi rõ ràng hơn
      alert("Bạn đã hết lượt làm bài!");
      return;
    }

    if (!loading && !error) {
      setQuizId(state?.id);

      navigate(`/quiz/${state?.id}`, { state: { id: state?.id } });
    }
  };

  const fetchApi = async (quizId, userId) => {
    try {
      const res = await overview(quizId, userId);
      console.log("res", res);
      if (res.codeStatus !== 200) {
        return setError(res.code);
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.log("error", error.response);

      if (error.response) {
        handleErrorResponse(error.response);
      } else if (error.request) {
        // Khi không có phản hồi từ server
        console.error("No response from server:", error.request);
      } else {
        // Khi có lỗi trong quá trình thiết lập yêu cầu
        console.error("Error in setting up request:", error.message);
      }
    }
  };
  useEffect(() => {
    if ((state?.id, user.user_id)) {
      fetchApi(state?.id, user.user_id);
    }
  }, [state?.id, user.user_id]);
  return (
    <div className="intro-quiz container mt-4">
      <div className="intro-quiz main">
        <h1 className="title text-center">Overview</h1>
      </div>
      {data && (
        <>
          <div className="intro-quiz body">
            <ul className="body-list">
              <li className="list-item">
                <label htmlFor="#">Test name</label>
                <h3>{data.title?.toUpperCase()}</h3>
              </li>
              <li className="list-item">
                <label htmlFor="#">Status</label>
                <h3>
                  {error || data.attempts > 10 ? (
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
                <label htmlFor="#">Total question</label>
                <h3>{data.totalQuestion}</h3>
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
                <label htmlFor="#">Attempts</label>
                <h3 style={data.attempts > 10 ? { color: "red" } : {}}>
                  {data.attempts || 0}
                </h3>
              </li>
              <li className="list-item">
                <label htmlFor="#">Previous point</label>
                <h3>{data.score || 0.0}</h3>
              </li>
            </ul>
          </div>
          <div className="intro-quiz footer">
            <button
              className="btn btn-primary btn-lg get-start"
              disabled={loading || error || data.attempts >= 11} // Vô hiệu hóa nút khi loading, error, hoặc hết lượt
              onClick={handleStartQuiz}
            >
              {loading || error || data.attempts > 10 ? (
                <span style={{ color: "red", cursor: "no-drop" }}>
                  <MdOutlineNoEncryptionGmailerrorred size={30} />
                  {""}
                </span>
              ) : (
                <span>Get start</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewQuiz;
