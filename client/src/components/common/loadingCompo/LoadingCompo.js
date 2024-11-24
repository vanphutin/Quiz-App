import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Header/Logo/Logo";
import "./__LoadingCompo.scss";
import { CgSpinnerTwo } from "react-icons/cg";

const pendingArr = [
  "Please wait a moment while we load the data...",
  "Vui lòng chờ trong giây lát khi chúng tôi đang tải dữ liệu...",
  "Because the server is free, sometimes the speed may be slow or you may not be able to access it, we hope you understand.",
  "Do server miễn phí, đôi khi tốc độ có thể chậm hoặc bạn không thể truy cập được, mong bạn thông cảm.",
];

const LoadingCompo = ({ loading }) => {
  const myRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % pendingArr.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (myRef.current) {
      const hidden = myRef.current.previousSibling;

      if (!loading) {
        hidden?.classList.remove("d-none");
      } else {
        hidden?.classList.add("d-none");
      }
    }
  }, [loading]);

  return (
    <div className="loading loading-component" ref={myRef}>
      <div className="loading-logo">
        <Logo />
        <p className="loading-subtitle">
          by <span>VANPHUTIN's</span>
        </p>
      </div>
      <p className="loading-message">
        {" "}
        <CgSpinnerTwo className="loader-icon" /> {pendingArr[index]}
      </p>
    </div>
  );
};

export default LoadingCompo;
