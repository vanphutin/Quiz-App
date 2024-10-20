import React, { createContext, useEffect, useState } from "react";
import { getQuestionById } from "../services/apiQuestion";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";

// Tạo context
const DataQuesContext = createContext(null);

const MyProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [initMaxQuestion, setInitMaxQuestion] = useState(0);
  const [titleQuiz, setTitleQuiz] = useState("");
  const [quizId, setQuizId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // kiểm tra trước khi làm bài thi
  // chưa đăng nhập or hết hạn token thì error code - status
  // fix lỗi 403 trang quiz - overview

  useEffect(() => {
    if (quizId) {
      fetchApiQuestionById(quizId);
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
  return (
    <DataQuesContext.Provider
      value={{
        data,
        initMaxQuestion,
        titleQuiz,
        quizId,
        setQuizId,
        setTitleQuiz,
        loading,
        error,
      }}
    >
      {children}
    </DataQuesContext.Provider>
  );
};

export { DataQuesContext, MyProvider };
