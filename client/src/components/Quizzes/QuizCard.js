import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./__QuizCard.scss";
import { Link } from "react-router-dom";

const QuizCard = ({ data }) => {
  return (
    <div className="card">
      <div className="quiz__card quiz__card--level">
        <div className="quiz__card__title ">{data.title}</div>
        <div
          className="quiz__card__description"
          data-toggle="tooltip"
          data-placement="top"
          title={data.description}
        >
          {data.description}
        </div>
        <div className="quiz__card__creator">
          <div className="quiz__card__creator__avatar">
            <span className="avatar-icon">
              <FaUser fontSize={15} />
            </span>
          </div>
          <div className="quiz__card__creator__name">{data.username}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
