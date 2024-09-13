import React from "react";
import "./__QuizCardTitle.scss";
const QuizCardTitle = ({ category }) => {
  return (
    <div className="category">
      <h3 className="category-name">{category}</h3>
    </div>
  );
};

export default QuizCardTitle;
