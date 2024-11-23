import React, { useState } from "react";
import SignUpForm from "../components/Signup/SignUpForm";
import { singupUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import { set } from "nprogress";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  //call api
  const fetchApi = async (formData) => {
    setIsLoading(true);
    try {
      const res = await singupUser(
        formData.password,
        formData.email,
        formData.username,
        formData.lastname,
        formData.firstname,
        formData.role,
        formData.school,
        formData.gender,
        formData.code
      );

      if (res.codeStatus === 201) {
        toast.success(res.messages || "Sign up success");
        navigator("/login");
      } else if (res.codeStatus === 401) {
        toast.error(res.error || "Sign up failed");
      } else {
        console.log("Login failed:", res.messages);
        toast.error(res.messages || "Sign up failed");
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = (formData) => {
    setTimeout(() => {
      fetchApi(formData);
    }, 1000);
  };
  return (
    <div className="container sign-up-page">
      <SignUpForm
        onSignup={handleSignUp}
        isLoading={isLoading}
        setIsLoading={set}
      />
    </div>
  );
};

export default SignUpPage;
