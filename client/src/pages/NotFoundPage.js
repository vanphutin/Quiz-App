// NotFound.js
import React from "react";
import "../assets/style/pages/_NotFoundPage.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="home-link">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
