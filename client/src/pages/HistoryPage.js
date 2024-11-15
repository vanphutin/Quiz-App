import React, { useEffect, useState } from "react";
import "../assets/style/pages/_HistoryPage.scss";
import { getHistory } from "../services/apiHistory";
import { useSelector } from "react-redux";
import { handleErrorResponse } from "../components/common/errorHandler/errorHandler";
import useDebounce from "../hook/useDebounce";
const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user.account);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fetchApi = async (user_id, search) => {
    try {
      const res = await getHistory(user_id, search);
      if (res.codeStatus !== 200) {
        return;
      }
      setData(res.data);
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      fetchApi(user.user_id, searchTerm);
    }
  }, [user, debouncedSearchTerm]);
  return (
    <div className="history-page container">
      <h1 className="history-title text-center">Your Quiz History</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="history-list">
        {data.length > 0 ? (
          data.map((entry, index) => (
            <li key={index} className="history-item">
              <div className="quiz-title">{entry.title}</div>
              <div className="score">Score: {entry.score}</div>
              <div className="date">
                Completed on: {entry.completion_date.split("T")[0]}
              </div>
              <div className="attempts">Attempts: {entry.attempts}</div>
            </li>
          ))
        ) : (
          <p>No quizzes found</p>
        )}
      </ul>
    </div>
  );
};

export default HistoryPage;
