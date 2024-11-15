import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import "../Auth/__Auth.scss";

const Auth = () => {
  const user = useSelector((state) => state.user.account);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <div className="auth__isAuthenticated text-end">
      {isAuthenticated ? (
        <UserDropDown username={user?.username} avatar={user?.avatar} />
      ) : (
        <>
          <Link to="/sign-up">
            <button className="btn btn-outline-secondary nav-auth__btn nav-auth__login text-white">
              Sign up
            </button>
          </Link>
          <Link to="/login">
            <button
              className="btn btn-info nav-auth__btn nav-auth__login"
              style={{ marginLeft: "20px" }}
            >
              Sign in
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Auth;
