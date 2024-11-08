import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuizCard from "../components/Quizzes/QuizCard";
import QuizCardTitle from "../components/Quizzes/QuizCardTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "../assets/style/pages/_QuizPage.scss";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { getQuizzes } from "../services/apiQuizzes";
import SkeletonLoader from "../components/common/skeletonLoader/SkeletonLoader";

const QuizPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const level = location?.state?.titleLevel; // Lấy level từ state
  const [dataQuizzes, setDataQuizzes] = useState([]);
  const quizzesFromState = location?.state?.dataQuizzes; // Lấy quizzes từ state
  useEffect(() => {
    const storedLevel = localStorage.getItem("level");
    const levelToUse =
      level || new URLSearchParams(location.search).get("level");

    if (quizzesFromState) {
      setDataQuizzes(quizzesFromState); // Sử dụng quizzes từ state
    } else if (levelToUse) {
      fetchApiQuiz(levelToUse.toLowerCase());
      localStorage.setItem("level", levelToUse.toLowerCase());
    } else if (storedLevel) {
      fetchApiQuiz(storedLevel);
    } else {
      navigate("/");
    }
  }, [level, quizzesFromState, location.search]);

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
          Level{"  "}
          <i>
            <h2 className="quizzes__level-title d-inline">
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
                  {item.quizzes.map((data) => (
                    <SwiperSlide key={data.quiz_id}>
                      <Link
                        to="overview"
                        state={{
                          id: data?.quiz_id,
                          title: data?.title,
                          totalQuestion: dataQuizzes?.length,
                        }}
                      >
                        <QuizCard data={data} />
                      </Link>
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
