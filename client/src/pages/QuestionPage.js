import React, { useContext, useEffect, useState } from "react";
import QuestionCard from "../components/Question/QuestionCard";
import { getQuestionById } from "../services/apiQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { toast } from "react-toastify";
import { DataQuesContext } from "../context/DataQuesContext";

const QuestionPage = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const quiz_id = state?.id;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, error } = useContext(DataQuesContext);
  useEffect(() => {
    if (error) {
      handleErrorResponse(error, navigate);
    }
  }, [error]);

  const handleNextQuestion = () => {
    if (currentIndex === data.length - 1) {
      navigate("/quiz/result");
    } else if (currentIndex < data.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Navigate to the previous question
  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
    }
  };
  return (
    <div className="question container  mt-5">
      <div className="question-main">
        <div className="qustion-title-quiz">
          <h2 className="name text-center">{state?.title}</h2>
        </div>
        {data?.length > 0 ? (
          <QuestionCard
            data={data[currentIndex]}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            currentIndex={currentIndex + 1}
            INIT_MAX_QUES={data?.length || 0}
            titleQuiz={state?.title}
            quiz_id={quiz_id}
            dataFull={data}
          />
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;

// fix loi overview khong tra thong tin ve
