import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./_ModalCreateCategory.scss";
import { toast } from "react-toastify";
import { postCategory } from "../../../../services/apiCategory";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";

function ModalCreateCategory({ show, handleClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!categoryName.trim()) {
      return toast.error("Missing Name");
    }
    if (!categoryDescription.trim()) {
      return toast.error("Missing Description");
    }

    // Call API
    try {
      const res = await postCategory(categoryName, categoryDescription);
      if (res && res.codeStatus === 200) {
        toast.success("Category created successfully!");
        setCategoryName("");
        setCategoryDescription("");
        handleClose();
      } else {
        toast.error("Failed to create category!");
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmitForm}>
          <div className="category-name">
            <label htmlFor="category-name">Category Name</label>
            <input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="category-description">
            <label htmlFor="category-description">Category Description</label>
            <input
              id="category-description"
              type="text"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalCreateCategory;
