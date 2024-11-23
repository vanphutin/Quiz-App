import React from "react";
import "./__CommonButton.scss";
import { CgSpinnerTwo } from "react-icons/cg";

const CommonButton = ({ className, type, isLoading, onClick, children }) => {
  return (
    <>
      {isLoading ? (
        <button disabled className={`btn ${className} btn-loading loading`}>
          <CgSpinnerTwo className="loader-icon" />
          <span>Loading...</span>
        </button>
      ) : (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default CommonButton;
