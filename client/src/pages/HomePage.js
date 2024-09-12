import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    // return <LoadingCompo loading={loading} />;
  }
};

export default HomePage;
