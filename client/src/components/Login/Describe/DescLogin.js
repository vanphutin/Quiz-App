import React from "react";
import "./__DescLogin.scss";

const DescLogin = ({ icon, title, describe }) => {
  return (
    <div className="DescLogin row">
      <div className="DescLogin__icon col-1">{icon}</div>
      <div className="DescLogin__intro col-11">
        <div className="DescLogin__intro-title">{title}</div>
        <div className="DescLogin__intro-describe">{describe}</div>
      </div>
    </div>
  );
};

export default DescLogin;
