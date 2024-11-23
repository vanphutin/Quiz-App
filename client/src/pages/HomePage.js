import React, { useEffect, useRef, useState } from "react";
import Introduction from "../components/Home/Introduction/Introduction";
import QuestionLevelCard from "../components/Home/QuestionLevelCard/QuestionLevelCard";
import LoadingCompo from "../components/common/loadingCompo/LoadingCompo";
import { useLoaderData } from "react-router-dom";
import { getAllQuizzLevel } from "../services/apiQuizzes";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const hiddenRef = useRef(null);
  useEffect(() => {
    // Set loading state based on data availability
    if (!Array.isArray(data) || data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    feachApi();
    // Handle actions when loading is complete
    if (!loading && hiddenRef.current) {
      const hiddenElement = hiddenRef.current.previousSibling;
      if (hiddenElement) {
        hiddenElement.classList.remove("d-none");
      }
    }
  }, [loading]);

  const feachApi = async () => {
    try {
      console.log("by Văn Phú Tín");
      const res = await getAllQuizzLevel();
      if (res.statusCode === 200) {
        const levelOrder = ["easy", "medium", "hard"];
        setData(
          res.data.sort((a, b) => {
            return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level);
          })
        );
      } else {
        console.log("error ");
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return <LoadingCompo loading={loading} />;
  }

  return (
    <div className="home container mt-5" ref={hiddenRef}>
      <div className="home__screen-main">
        <Introduction />
      </div>
      <div className="home__screen-card my-2 row">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((items, index) => (
            <div
              className="screen-card-item col-12 col-md-4 col-lg-4"
              key={index}
            >
              <QuestionLevelCard
                titleLevel={capitalizeFirstLetter(items.level)}
              />
            </div>
          ))
        ) : (
          <LoadingCompo loading={loading} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
