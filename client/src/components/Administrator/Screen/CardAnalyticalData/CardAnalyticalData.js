import React from "react";
import "./__CardAnalyticalData.scss";
const CardAnalyticalData = (props) => {
  return (
    <div className="card">
      <div className="card__description text-start">
        <h6> Total {props.description} count</h6>
      </div>
      <div className="card__data row">
        <div className="card__data__description col-12 col-md-6 col-lg-6">
          {props.description}
        </div>
        <div className="card__data__count col-12 col-md-6 col-lg-6">
          {props.count}
        </div>
      </div>
    </div>
  );
};

export default CardAnalyticalData;
