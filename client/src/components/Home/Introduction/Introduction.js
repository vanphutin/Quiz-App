import React from "react";
import "./__Introduction.scss";
import bannerV3 from "../../../assets/image/bannerV3.png";
const Introduction = () => {
  return (
    <div className="introduction">
      <div className="introduction__title">
        <div className="introduction__title-main">
          <h1 className="text">
            Join <p>the ranking</p>
          </h1>
        </div>
        <div className="introduction__title-describe">
          <h5>
            Are you ready to take on our challenges and prove your skills? Take
            our tests, rise through the ranks, and claim your spot at the top of
            the leaderboard—where the best compete for glory!
          </h5>
        </div>
      </div>
      <div className="introduction__bannerImg">
        <img src={bannerV3} alt="Ranking" />
      </div>
    </div>
  );
};

export default Introduction;
