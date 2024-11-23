import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./__QuizCard.scss";

const QuizCard = ({ data }) => {
  function formatString(input) {
    const words = input.toLowerCase().split(" ");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join(" ");
  }
  const newTtileFormat = formatString(data.title);

  return (
    <div className="card">
      <div className="quiz__card quiz__card--level">
        <div className="quiz__card__title ">{newTtileFormat}</div>
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
