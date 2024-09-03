import React from "react";
import { toast } from "react-toastify";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Firstname: {user.firstname}</p>
      <p>Lastname: {user.lastname}</p>
      <p>Email: {user.email}</p>

      {isAuthenticated ? "ok" : "no"}
    </div>
  );
};

export default HomePage;
