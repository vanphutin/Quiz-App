import React, { useEffect, useState } from "react";
import "./__TabQuiz.scss";
import ModalCreateCategory from "./ModalCreateCategory";
import TableData from "./TableData";
import { getQuiz } from "../../../../services/apiAdministrator";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";
import { Pagination } from "@mui/material";
import ModalCreateQuestion from "./ModalCreateQuestion";
import ModalCreateQuiz from "./ModalCreateQuiz";
import { useSelector } from "react-redux";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { SiQuizlet } from "react-icons/si";
import { BsFillPatchQuestionFill } from "react-icons/bs";

const TabQuiz = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [countQuiz, setCountQuiz] = useState(0);
  const user = useSelector((state) => state.user.account);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    if (user && user.role === "instructor") {
      fetchApi(currentPage, itemsPerPage, sort, user.user_id);
    }
    if (user && user.role === "admin") {
      fetchApi(currentPage, itemsPerPage, sort);
    }
  }, [currentPage, sort, user]);

  const fetchApi = async (currentPage, itemsPerPage, sort, userID) => {
    try {
      const res = await getQuiz(currentPage, itemsPerPage, sort, userID);
      if (res.statusCode === 200) {
        setData(res.data);
        setCountQuiz(res.quizCount);
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShowModalCategories = () => {
    setShow(true);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const [modalShowQues, setModalShowQues] = useState(false);

  const [showQues, setShowQues] = useState(false);

  const handleShowModalQues = () => {
    setModalShowQues(true);
  };

  const [modalShowQuesCreate, setModalShowQuesCreate] = useState(false);
  const [showQuesCreate, setShowQuesCreate] = useState(false);

  const handleShowModalQuizz = () => {
    setShowQuesCreate(true);
  };
  const handleCloseQuesCreate = () => setShowQuesCreate(false);
  return (
    <div className="quiz">
      <div className="quiz__model d-flex gap-4">
        <button
          className="quiz__model__creare-quiz btn  btn-outline-primary text-light"
          onClick={() => handleShowModalCategories()}
        >
          <span className="quiz-icon">
            <BiSolidCategoryAlt />
          </span>
          Create new categories
        </button>

        <button
          className="quiz__model__creare-quiz btn  btn-outline-info text-light"
          onClick={() => handleShowModalQuizz()}
        >
          <span className="quiz-icon">
            <SiQuizlet />
          </span>
          Create new quiz
        </button>

        <button
          className="quiz__model__creare-question quiz__model__creare-quiz btn btn-outline-dark text-light"
          onClick={() => handleShowModalQues()}
        >
          <span className="question-icon quiz-icon">
            <BsFillPatchQuestionFill />
          </span>
          Create new question
        </button>
      </div>
      <hr />
      <div className="quiz__table mt-3">
        <div className="quiz__table__title">
          <h2>Categories Table</h2>
        </div>
        <div className="quiz__table__main mt-3">
          <TableData data={data} />
        </div>
        <div className="pagination">
          <Pagination
            count={Math.ceil(countQuiz / itemsPerPage)} // Total pages based on items per page
            page={currentPage} // Current page state
            onChange={handlePageChange} // Handle page change
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </div>
      </div>
      <ModalCreateCategory show={show} handleClose={handleClose} />

      <ModalCreateQuiz
        show={showQuesCreate}
        handleClose={handleCloseQuesCreate}
      />

      <ModalCreateQuestion
        show={modalShowQues}
        onHide={() => setModalShowQues(false)}
      />
    </div>
  );
};

export default TabQuiz;
