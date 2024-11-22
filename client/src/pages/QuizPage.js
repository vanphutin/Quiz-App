import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import QuizCard from "../components/Quizzes/QuizCard";
import QuizCardTitle from "../components/Quizzes/QuizCardTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "../assets/style/pages/_QuizPage.scss";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { getQuizzes } from "../services/apiQuizzes";
import SkeletonLoader from "../components/common/skeletonLoader/SkeletonLoader";
import useDebounce from "../hook/useDebounce";

const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null); // Ref cho ô input

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataQuizzes, setDataQuizzes] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const level = location?.state?.titleLevel; // Lấy level từ state
  const quizzesFromState = location?.state?.dataQuizzes; // Lấy quizzes từ state

  // Focus vào ô input khi trang được tải
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Gán focus sau khi phần tử được render
    }
  }, []); // Theo dõi ref thay đổi

  // Fetch dữ liệu khi level hoặc searchTerm thay đổi
  useEffect(() => {
    const storedLevel = localStorage.getItem("level");
    const levelToUse =
      level || new URLSearchParams(location.search).get("level");

    if (quizzesFromState) {
      setDataQuizzes(quizzesFromState); // Sử dụng quizzes từ state
    } else if (levelToUse) {
      fetchApiQuiz(levelToUse.toLowerCase(), debouncedSearchTerm);
      localStorage.setItem("level", levelToUse.toLowerCase());
    } else if (storedLevel) {
      fetchApiQuiz(storedLevel, debouncedSearchTerm);
    } else {
      navigate("/");
    }
  }, [level, debouncedSearchTerm]);

  // Hàm fetch API
  const fetchApiQuiz = async (level, search) => {
    setLoading(true);
    try {
      const res = await getQuizzes(level, search);
      if (res.statusCode === 200) {
        setDataQuizzes(res.data);
      } else {
        console.error("Error fetching quizzes");
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
      <div className="quizzes__level d-flex align-center justify-content-between ">
        <div className="search-bar">
          <input
            type="text"
            ref={searchInputRef} // Gắn ref vào input
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span>
          Level{" "}
          <i>
            <h2 className="quizzes__level-title d-inline">
              {level?.toLowerCase()}
            </h2>
          </i>
        </span>
      </div>
      <div className="quizzes__type mt-3">
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
