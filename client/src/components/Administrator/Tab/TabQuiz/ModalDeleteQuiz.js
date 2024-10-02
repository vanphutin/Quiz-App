import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";
import { deleteQuiz } from "../../../../services/apiQuizzes";
import { toast } from "react-toastify";

function ModalDeleteQuiz({ show, handleClose, quizId, onDeleteSuccess }) {
  const handleConfirm = async () => {
    try {
      const res = await deleteQuiz(quizId); // Sử dụng quizId từ props
      if (res.statusCode === 200) {
        toast.success(res.message || "Delete success");
        handleClose(); // Đóng modal sau khi xóa thành công
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDeleteQuiz;
