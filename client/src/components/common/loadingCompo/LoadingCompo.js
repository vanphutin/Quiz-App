import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Header/Logo/Logo";
import "./__LoadingCompo.scss";
import { CgSpinnerTwo } from "react-icons/cg";

const pendingArr = [
  "Please wait while we load data...",
  "Vui lòng chờ trong khi chúng tôi đang tải dữ liệu...",
  "我们正在加载数据，请稍候...",
  "กรุณารอสักครู่ในขณะที่เรากำลังโหลดข้อมูล...",
  "データをロード中ですのでお待ちください...",
  "데이터를 로드하는 동안 잠시 기다려 주십시오...",
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
