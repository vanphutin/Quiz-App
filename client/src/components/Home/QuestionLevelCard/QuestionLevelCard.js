import React from "react";
import { LuShieldQuestion } from "react-icons/lu";
import { BsArrowUpRight } from "react-icons/bs";
import "./__QuestionLevelCard.scss";
import { Link } from "react-router-dom";

const QuestionLevelCard = ({ titleLevel }) => {
  const level = titleLevel.toLowerCase();

  return (
    <div className="question__card">
      <div className="question__card-title">{titleLevel}</div>
      <div className="question__card-icon">
        <LuShieldQuestion fontSize="6rem" />
      </div>

      <Link
        to={`/quiz?level=${level}`}
        state={{ titleLevel }} // This is how you set the state properly
      >
        <button className="question__card-button">
          Get started <BsArrowUpRight className="button-icon" />
        </button>
      </Link>
    </div>
  );
};

export default QuestionLevelCard;
