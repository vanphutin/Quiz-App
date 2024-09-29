import React, { useEffect, useState } from "react";
import CardAnalyticalData from "../../Screen/CardAnalyticalData/CardAnalyticalData";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";
import {
  getCategorieTotal,
  getQuestion,
  getQuiz,
  getUsers,
} from "../../../../services/apiAdministrator";
import TableData from "./TableData";
import { Pagination } from "@mui/material";
import { FaSortAlphaDown, FaSortAlphaUpAlt } from "react-icons/fa";
import SkeletonLoader from "../../../common/skeletonLoader/SkeletonLoader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [countUser, setCountUser] = useState(0);

  const [quiz, setQuiz] = useState([]);
  const [nameQuiz, setNameQuiz] = useState("");
  const [countQuiz, setCountQuiz] = useState(0);

  const [nameQuestion, setNameQuestion] = useState("");
  const [countQuestion, setCountQuestion] = useState(0);

  const [nameCategorie, setNameCategorie] = useState("");
  const [countCategorie, setCountCategorie] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, sort);
  }, [currentPage, sort]);

  const fetchUsers = async (page, limit, sort) => {
    try {
      const res = await getUsers(page, limit, sort);
      if (res.statusCode === 200) {
        setUser(res.data);
        setNameUser(res.name);
        setCountUser(res.userCount);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await getQuiz();
      if (res.statusCode === 200) {
        setQuiz(res.data);
        setCountQuiz(res.quizCount);
        setNameQuiz(res.name);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchApiTotal();
  }, []);

  const fetchApiTotal = async () => {
    setLoading(true);

    try {
      const resQuestion = await getQuestion();
      const resCategorie = await getCategorieTotal();

      if (resQuestion.statusCode === 200 || resCategorie.statusCode === 200) {
        setCountQuestion(resQuestion.questionCount);
        setNameQuestion(resQuestion.name);

        setCountCategorie(resCategorie.categorieCount);
        setNameCategorie(resCategorie.name);
      } else {
        return <p>No data</p>;
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex gap-5">
          {" "}
          <SkeletonLoader loadAvatar={false} />
          <SkeletonLoader loadAvatar={false} />
        </div>
      ) : (
        <div className="dashboard__analytical">
          <ul className="row" style={{ paddingLeft: "0" }}>
            <li
              style={{ listStyle: "none" }}
              className="col-12  col-md-6 col-lg-3"
            >
              <CardAnalyticalData
                count={countUser || "NaN"}
                description={
                  nameUser.charAt(0).toLocaleUpperCase() + nameUser.slice(1) ||
                  "NaN"
                }
              />
            </li>
            <li
              style={{ listStyle: "none" }}
              className="col-12 col-md-6 col-lg-3"
            >
              <CardAnalyticalData
                count={countQuiz || "NaN"}
                description={
                  nameQuiz.charAt(0).toLocaleUpperCase() + nameQuiz.slice(1) ||
                  "NaN"
                }
              />
            </li>
            <li
              style={{ listStyle: "none" }}
              className="col-12 col-md-6 col-lg-3"
            >
              <CardAnalyticalData
                count={countQuestion || "NaN"}
                description={
                  nameQuestion.charAt(0).toLocaleUpperCase() +
                    nameQuestion.slice(1) || "NaN"
                }
              />
            </li>
            <li
              style={{ listStyle: "none" }}
              className="col-12 col-md-6 col-lg-3"
            >
              <CardAnalyticalData
                count={countCategorie || "NaN"}
                description={
                  nameCategorie.charAt(0).toLocaleUpperCase() +
                    nameCategorie.slice(1) || "NaN"
                }
              />
            </li>
          </ul>
        </div>
      )}
      {loading ? (
        <p className="mt-5">Fetching data ...</p>
      ) : (
        <div className="dashboard__table mt-4">
          <h2 className="dashboard__table__title">
            User Table | <span>Sort</span>
            <div className="dashboard__sort d-inline">
              <button className="mx-3" onClick={() => setSort("asc")}>
                <FaSortAlphaDown />
              </button>
              <button className="mx-3" onClick={() => setSort("desc")}>
                <FaSortAlphaUpAlt />
              </button>
            </div>
          </h2>
          <div className="dashboard__table__main mt-4">
            <TableData data={user} count={countUser} />
            <div className="pagination">
              <Pagination
                count={Math.ceil(countUser / itemsPerPage)} // Total pages based on items per page
                page={currentPage} // Current page state
                onChange={handlePageChange} // Handle page change
                variant="outlined"
                color="primary"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
