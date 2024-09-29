import React, { useEffect, useRef, useState } from "react";
import Introduction from "../components/Home/Introduction/Introduction";
import QuestionLevelCard from "../components/Home/QuestionLevelCard/QuestionLevelCard";
import LoadingCompo from "../components/common/loadingCompo/LoadingCompo";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
  const data = useLoaderData() || [];
  const [loading, setLoading] = useState(true);
  const hiddenRef = useRef(null);

  useEffect(() => {
    // Giả lập thời gian chờ khi tải dữ liệu
    const timer = setTimeout(() => {
      if (data.length > 0) {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    // Xử lý khi loading đã hoàn tất
    if (!loading && hiddenRef.current) {
      const hiddenElement = hiddenRef.current.previousSibling;
      if (hiddenElement) {
        // Đảm bảo rằng phần tử trước đó tồn tại và có thể xử lý
        hiddenElement.classList.remove("d-none");
      }
    }
  }, [loading]);

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
        {data.length > 0 ? (
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
          <p>No quiz levels available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
