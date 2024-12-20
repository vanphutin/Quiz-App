import React, { useEffect, useState } from "react";
import LoginForm from "../components/Login/LoginForm/LoginForm";
import LoginDesc from "../components/Login/LoginDesc/LoginDesc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/apiAuth";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "../redux/userSlice";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  //call api
  const fetchApi = async (formData) => {
    setIsLoading(true);
    try {
      const res = await loginUser(formData.email, formData.password);
      if (res.codeStatus === 200) {
        navigator("/");
        dispatch(USER_LOGIN_SUCCESS(res.data));
      } else if (res.codeStatus === 401) {
        toast.error(res.error || res.messages || "Login failed");
      } else {
        console.log("Login failed:", res.messages);
        toast.error(res.message || "Login failed ");
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý logic đăng nhập ở đây (gọi API, xác thực, v.v.)
  const handleLogin = (formData) => {
    setTimeout(() => {}, 1000);
    fetchApi(formData);
  };

  return (
    <div
      className="login-page container d-flex align-items-center justify-content-center "
      style={{ height: "90vh" }}
    >
      <div className="login-form-page gap-3 d-flex align-items-center justify-content-center row  ">
        <div className="desc-container d-none d-lg-block  col-12 col-md-6">
          <LoginDesc />
        </div>
        <div className="login-container col-12 col-lg-5 col-md-12">
          <LoginForm
            onLogin={handleLogin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
