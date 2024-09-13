import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuizCard from "../components/Quizzes/QuizCard";
import QuizCardTitle from "../components/Quizzes/QuizCardTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "../assets/style/pages/_QuizPage.scss";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { getQuizzes } from "../services/apiQuizzes";
import SkeletonLoader from "../components/common/skeletonLoader/SkeletonLoader";

const QuizPage = () => {
  const [loading, setLoading] = useState(false);
  const level = useLocation()?.state?.titleLevel;
  const [dataQuizzes, setDataQuizzes] = useState([]);

  useEffect(() => {
    if (level) {
      fetchApiQuiz(level.toLowerCase());
    }
  }, [level]);

  //fetch api
  const fetchApiQuiz = async (level) => {
    setLoading(true);
    try {
      const res = await getQuizzes(level);
      if (res.statusCode === 200) {
        setDataQuizzes(res.data);
      } else {
        console.log("Error fetching quizzes");
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <span className="container mt-5 d-flex gap-3">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </span>
    );
  }
  return (
    <div className="quizzes container mt-3">
      <div className="quizzes__level text-end">
        <span>
          Level
          <i>
            <h2 className="quizzes__level-title d-inline">
              {" "}
              {level?.toLowerCase()}
            </h2>
          </i>
        </span>
      </div>
      <div className="quizzes__type">
        {dataQuizzes.length > 0 ? (
          dataQuizzes.map((item, index) => (
            <div key={index} className="quizzes__type-item mb-4">
              <div className="quizzes__type-item-title">
                <QuizCardTitle category={item.category_name} />
              </div>
              <div className="quizzes__type-item-card">
                <Swiper
                  grabCursor={true}
                  spaceBetween={40}
                  slidesPerView={"auto"}
                >
                  {item.quizzes.map((data, index) => (
                    <SwiperSlide key={index}>
                      <QuizCard data={data} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))
        ) : (
          <p>No quizzes available</p>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
