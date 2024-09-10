import React from "react";
import { LuShieldQuestion } from "react-icons/lu";
import { BsArrowUpRight } from "react-icons/bs";
import "./__QuestionLevelCard.scss";
import { Link } from "react-router-dom";

const QuestionLevelCard = ({ titleLevel }) => {
  return (
    <div className="question__card">
      <div className="question__card-title">{titleLevel}</div>
      <div className="question__card-icon">
        <LuShieldQuestion fontSize="6rem" />
      </div>
      <Link state={{ level: titleLevel }}>
        <button className="question__card-button">
          Get started <BsArrowUpRight className="button-icon" />
        </button>
      </Link>
    </div>
  );
};

export default QuestionLevelCard;
