import React, { createContext, useEffect, useState } from "react";
import { getQuestionById } from "../services/apiQuestion";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { useSelector } from "react-redux";
import { getAttempts } from "../services/apiResult";

// Tạo context
const DataQuesContext = createContext(null);

const MyProvider = ({ children }) => {
  const user = useSelector((state) => state.user.account);

  const [data, setData] = useState([]);
  const [initMaxQuestion, setInitMaxQuestion] = useState(0);
  const [titleQuiz, setTitleQuiz] = useState("");
  const [quizId, setQuizId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [scoreQuiz, setScoreQuiz] = useState(0);

  // kiểm tra trước khi làm bài thi
  // chưa đăng nhập or hết hạn token thì error code - status
  // fix lỗi 403 trang quiz - overview
  useEffect(() => {
    if (quizId) {
      fetchApiQuestionById(quizId);
      if (user?.user_id) {
        fetchApiAttempts(user.user_id, quizId);
      }
    }
  }, [quizId]);

  const fetchApiQuestionById = async (quizId) => {
    try {
      const res = await getQuestionById(quizId);

      if (res.statusCode !== 200) {
        throw new Error(`API error with status ${res.status}`);
      }
      setData(res.data);
      setInitMaxQuestion(res.data.length);
      setLoading(null);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateAttempt = async (userId, quizId) => {
    try {
      const res = await getAttempts(userId, quizId); // Gọi API để lấy số lần thử mới nhất
      if (res.codeStatus !== 200) {
        throw new Error(`API error with status ${res.codeStatus}`);
      }
      setAttempt(res.data.attempts); // Cập nhật state attempt
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  const fetchApiAttempts = async (userID, quizID) => {
    try {
      const res = await getAttempts(userID, quizID);
      if (res.codeStatus !== 200) {
        throw new Error(error);
      }
      setScoreQuiz(res.data.score);
      setAttempt(res.data.attempts);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <DataQuesContext.Provider
      value={{
        data,
        initMaxQuestion,
        titleQuiz,
        quizId,
        setQuizId,
        setTitleQuiz,
        setError,
        loading,
        error,
        attempt,
        scoreQuiz,
        updateAttempt,
      }}
    >
      {children}
    </DataQuesContext.Provider>
  );
};

export { DataQuesContext, MyProvider };
