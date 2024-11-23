import React from "react";
import "./SkeletonLoader.scss";

const SkeletonLoader = ({ loadAvatar }) => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description"></div>
      {loadAvatar && (
        <div className="quiz__card__creator">
          <div className="skeleton skeleton-avatar"></div>
          <div
            className="skeleton skeleton-title"
            style={{ width: "30%" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SkeletonLoader;
