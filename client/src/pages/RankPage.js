import React, { useEffect, useState } from "react";
import "../assets/style/pages/_RankPage.scss";
import { TfiCup } from "react-icons/tfi";
import getRanking from "../services/apiRanking";
import { useSelector } from "react-redux";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";

const RankPage = () => {
  const user = useSelector((state) => state.user.account);

  const [ranks, setRanks] = useState([]);
  const [rankOneChampionship, setRankOneChampionship] = useState(null);
  const [myRank, setMyRank] = useState(null);

  const fetchApi = async (user_id) => {
    try {
      const res = await getRanking(user_id);
      console.log(res);
      if (res.statusCode === 200) {
        setRanks(res.data.ranks);
        const oneChampionship = res.data.ranks.filter(
          (rank) => rank.rank === 1
        );
        setRankOneChampionship(oneChampionship);
      } else {
        console.error("Failed to fetch rankings");
      }
    } catch (error) {
      console.error("Error fetching ranking data:", error.message);
      handleErrorResponse(error);
    }
  };

  useEffect(() => {
    fetchApi(user.user_id);
  }, [user.user_id]);
  console.log("rankOneChampionship", rankOneChampionship);
  return (
    <div className="rank-page container">
      <div className="table-rank mt-3">
        <div className="table-rank__top-1">
          <div className="rank_top_item">
            <h1 className="top-label">
              <span className="position top-rank">
                <TfiCup size={50} className="cup_onechame" /> 1
              </span>
            </h1>
            {rankOneChampionship && (
              <>
                <h2 className="top-fullname">
                  {rankOneChampionship[0]?.lastname}{" "}
                  {rankOneChampionship[0]?.firstname}
                </h2>
                <h3 className="top-username">
                  @{rankOneChampionship[0]?.username}
                </h3>
                <h3 className="top-point">
                  <span className="point">Points </span>
                  {rankOneChampionship[0]?.total_score}
                </h3>
              </>
            )}
          </div>
        </div>
        <hr />
        <div className="table-rank__header row">
          <h3 className="title-item place col-4">Place</h3>
          <h3 className="title-item username col-4">Username</h3>
          <h3 className="title-item point col-4">Points</h3>
        </div>
        <ul className="table-rank__items">
          <div className="ranking_user">
            {ranks.map((user, index) => (
              <li key={index} className="table-rank__item row">
                <span className="place col-4">
                  <TfiCup /> {user.rank}
                </span>
                <span className="username col-4">
                  <i> @{user.username}</i>
                </span>
                <span className="point col-4">{user.total_score}</span>
              </li>
            ))}
          </div>
          {/* Display current user's rank if available */}
          {myRank && (
            <li className="table-rank__item row my-rank">
              <span className="place col-4">
                <TfiCup /> {myRank.rank}
              </span>
              <span className="username col-4">
                <i> @ {myRank.username || "---"}</i>
              </span>
              <span className="point col-4">{myRank.total_score || "---"}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RankPage;
