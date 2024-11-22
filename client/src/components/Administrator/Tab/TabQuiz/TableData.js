import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

function TableData({ data, onDeleteSuccess }) {
  const user = useSelector((state) => state.user.account);
  const [showDelete, setShowDelete] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const handleClose = () => {
    setShowDelete(false);
    setQuizToDelete(null); // Reset the quiz to delete when closing
    onDeleteSuccess(true);
  };
  const handleShow = () => setShowDelete(true);
  const formatDay = (str) => {
    const date = str.substr(0, 10); // "YYYY-MM-DD"
    const [year, month, day] = date.split("-"); // Split by "-"
    return `${day}-${month}-${year}`; // Reorder to "DD-MM-YYYY"
  };
  const handleDeleteQuiz = (id) => {
    setShowDelete(true);
    setQuizToDelete(id); // Reset the quiz to delete when closing
  };
  return (
    <>
      {data ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Description</th>
              {user && user.role === "admin" && <th>Created by</th>}
              <th>Category name</th>
              <th>Level</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-light">
                <td>{index}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                {user && user.role === "admin" && (
                  <td>
                    @<i>{item.username}</i>
                  </td>
                )}
                <td>{item.category_name}</td>
                <td>{item.level}</td>
                <td>{formatDay(item.created_at)}</td>
                <td className="">
                  <button type="button" className="btn btn-info btn-sm w-100">
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDeleteQuiz(item.quiz_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        "Fetching data..."
      )}

      <ModalDeleteQuiz
        handleClose={handleClose}
        quizId={quizToDelete}
        show={showDelete}
        onDeleteSuccess={onDeleteSuccess} // Truyền callback để làm mới danh sách sau khi xóa
      />
    </>
  );
}

export default TableData;
