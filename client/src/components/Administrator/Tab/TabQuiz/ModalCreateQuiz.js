import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputField from "../../../common/InputField/InputField";
import { getCategorie } from "../../../../services/apiAdministrator";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postQuiz } from "../../../../services/apiQuizzes";

function ModalCreateQuiz({ show, handleClose }) {
  const init_level = ["easy", "medium", "hard"];
  const [quizData, setQuizzData] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const user = useSelector((state) => state.user.account.user_id);

  React.useEffect(() => {
    fetchApiGetQuiz();
  }, []);
  const fetchApiGetQuiz = async () => {
    try {
      const res = await getCategorie();
      if (res.statusCode === 200) {
        setQuizzData(res.data);
      } else {
        console.log("error at fetchApiGetQuiz");
      }
    } catch (error) {
      console.log("error", error);

      handleErrorResponse(error);
    }
  };
  const validate = (title, category, description, level, user) => {
    if (title === "") {
      toast.error("Missing required field: title");
      return false;
    }
    if (category === "") {
      toast.error("Missing required field: category");
      return false;
    }
    if (description === "") {
      toast.error("Missing required field: description");
      return false;
    }
    if (level === "") {
      toast.error("Missing required field: level");
      return false;
    }
    // Assuming user validation might also be needed:
    if (user === "") {
      toast.error("Missing required field: user");
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Validate the form fields before proceeding
    if (validate(title, category, description, level, user)) {
      // Continue form submission process
      const res = await postQuiz(
        title.toLowerCase().trim(),
        category,
        description.toLowerCase().trim(),
        level,
        user
      );

      try {
        if (res.statusCode === 201) {
          handleClose(true);

          return toast.success("Create new a quizz successful");
        }
      } catch (error) {
        console.log("error", error);
        handleErrorResponse(error);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal create new quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body autoFocus>
          <form action="" onSubmit={(e) => handleSubmitForm(e)}>
            <div className="select-category d-flex gap-5">
              <label className="text-center d-flex align-items-center w-25">
                Category name
              </label>
              <Form.Select
                aria-label="Default select example d-inline"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select menu category name </option>
                {quizData &&
                  quizData.map((item, index) => (
                    <option key={index} value={item.category_id}>
                      {item.category_name}
                    </option>
                  ))}
              </Form.Select>
            </div>

            <div className="select-category d-flex gap-5">
              <label className="text-center d-flex align-items-center w-25">
                Title
              </label>
              <InputField
                placeholder={"Short title..."}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="select-level d-flex gap-5">
              <label className="text-center d-flex align-items-center w-25">
                Level
              </label>
              <Form.Select
                aria-label="Default select example d-inline"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">Select menu level</option>
                {init_level &&
                  init_level.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Select>
            </div>

            <div className="select-category d-flex gap-5">
              <label className="text-center d-flex align-items-center w-25">
                Description
              </label>
              <InputField
                placeholder={"Short description..."}
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 70) {
                    setDescription(e.target.value);
                  }
                }}
              />
            </div>
            <div className="limit-descript text-end ">
              <p>
                <span
                  style={
                    description.length > 60
                      ? { color: "red" }
                      : { color: "#fff" }
                  }
                >
                  {description.length}
                </span>{" "}
                / 70
              </p>
            </div>

            <Modal.Footer className="mt-3">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateQuiz;
