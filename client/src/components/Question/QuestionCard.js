import React, { useEffect, useState } from "react";
import "./__QuestionCard.scss";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleErrorResponse } from "../common/errorHandler/errorHandler";
import { toast } from "react-toastify";
import { submitAnswer } from "../../services/apiResult";

const QuestionCard = ({
  data,
  onNext,
  onPrev,
  currentIndex,
  INIT_MAX_QUES,
  titleQuiz,
  dataFull,
  quiz_id,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.account);
  const [countSubmit, setCountSubmit] = useState(0);
  const [timer, setTimer] = useState(25);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState([]); // Lưu kết quả của tất cả các câu
  useEffect(() => {
    if (data) {
      setTimer(15);

      const savedAnswer = results.find(
        (result) => result.questionIndex === data.question_id
      );
      if (savedAnswer) {
        setSelectedAnswer(savedAnswer.answer);
      } else {
        setSelectedAnswer(null);
      }
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          saveAnswer();
          if (currentIndex === dataFull.length) {
            handleSubmit();
          }
          onNext();
          clearInterval(intervalId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const handleOnChange = (e) => {
    setSelectedAnswer(e.target.value);
  };
  const saveAnswer = () => {
    if (selectedAnswer) {
      setResults((prevResults) => {
        const updatedResults = prevResults.filter(
          (result) => result.questionIndex !== data?.question_id
        );
        return [
          ...updatedResults,
          { questionIndex: data?.question_id, answer: selectedAnswer },
        ];
      });
    }
  };

  const handleCopy = (e) => {
    e.preventDefault();
    toast.warn("Copying content is disabled!");
  };

  const apiFetchSubmitAnswer = async (user_id, quiz_id, answers) => {
    try {
      const res = await submitAnswer(user_id, quiz_id, answers);

      if (res.codeStatus !== 200) {
        return toast.error("Có lỗi xảy ra!");
      }
      return res;
    } catch (error) {
      console.error("Error in apiFetchSubmitAnswer:", error.message);
      handleErrorResponse(error);
      return {
        status: "error",
        message: "Failed to submit answer. Please try again later.",
        error: error.message,
      };
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Bắt đầu tải
    try {
      await saveAnswer(); // Lưu câu trả lời
      setCountSubmit((count) => count + 1); // Cập nhật bộ đếm
    } catch (error) {
      console.error("Error saving answer:", error);
    } finally {
      setLoading(false); // Hoàn thành xử lý
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (countSubmit === 1) {
        const res = await apiFetchSubmitAnswer(user?.user_id, quiz_id, results);
        navigate("/quiz/result", {
          state: { res, titleQuiz },
        });
        setCountSubmit(0);
      }
    };

    fetchData();
  }, [results, countSubmit]);

  return (
    <div className="question-card mt-4">
      <div className="card-main">
        <h3 className="card__title" onCopy={(e) => handleCopy(e)}>
          <span className="text-white">{currentIndex}</span>
          <span className="text-white" style={{ fontSize: "1rem" }}>
            /{INIT_MAX_QUES + " "}
          </span>
          <span className="text-white">. </span>
          {data?.question_text}
        </h3>

        <div className="option-answer">
          <ul className="option-answer-items">
            {data?.options.map((item, index) => (
              <li key={item.option_id} className={`answer_${index + 1}`}>
                <label htmlFor={item.option_id}>
                  <span>{index + 1}.</span> {item.option_text}
                </label>
                <input
                  type="radio"
                  id={item.option_id}
                  name={`question_${data.question_id}`}
                  value={item.option_id}
                  onChange={(e) => handleOnChange(e)}
                  checked={selectedAnswer === item.option_id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-footer">
        {/* <button
          className="prev btn btn-outline-secondary"
          onClick={() => {
            saveAnswer();
            onPrev();
          }}
        >
          <GrPrevious size={20} />
          prev
        </button> */}
        <div className="timer">
          <span
            className="text-center"
            style={timer <= 5 ? { color: "red" } : {}}
          >
            {timer}s
          </span>
        </div>

        {currentIndex === INIT_MAX_QUES ? (
          <button
            disabled={loading}
            className="next btn btn-primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit <BsSendFill />
          </button>
        ) : (
          <button
            className="next btn btn-outline-secondary"
            onClick={() => {
              saveAnswer();
              onNext();
            }}
          >
            next <GrNext size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
