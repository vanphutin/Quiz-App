import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputField from "../../../common/InputField/InputField";
import { TbReload } from "react-icons/tb";

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import "./__ModalCreateQuestion.scss";
import { getCategorie, getQuiz } from "../../../../services/apiAdministrator";
import { handleErrorResponse } from "../../../common/errorHandler/errorHandler";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import _ from "lodash";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { postQuestion } from "../../../../services/apiQuestion";
function ModalCreateQuestion(props) {
  const { dataquiz } = props;
  const level = ["easy", "medium", "hard"];
  const question_type = ["multiple_choice", "true_false", "short_answer"];
  const [quizData, setQuizzData] = React.useState("");
  const [quizChoose, setQuizzChoose] = React.useState("");
  const [quizLevel, setQuizzLevel] = React.useState("easy");
  const [questionType, setQuestionType] = React.useState("multiple_choice");
  const user = useSelector((state) => state.user.account);
  const questionId = uuidv4();
  const [questions, setQuestions] = React.useState([
    {
      question_id: questionId,
      quiz_id: quizChoose,
      question_text: "",
      question_type: questionType,
      difficulty: quizLevel,
      answer: [
        {
          option_id: uuidv4(),
          option_text: "",
          is_correct: true,
          question_id: questionId,
        },
        {
          option_id: uuidv4(),
          option_text: "",
          is_correct: false,
          question_id: questionId,
        },
      ],
    },
  ]);
  React.useEffect(() => {
    const updatedQuestions = questions.map((question) => ({
      ...question,
      difficulty: quizLevel,
      question_type: questionType,
      quiz_id: quizChoose,
    }));
    setQuestions(updatedQuestions);
  }, [quizLevel, questionType, quizChoose]);

  //tính toán sự khác biệt giữa thời gian hiện tại và thời gian bạn muốn hiển thị.
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximate 30 days as a month
    const years = Math.floor(days / 365); // Approximate 365 days as a year

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (weeks > 0) {
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }

  const handleActionQuestion = (type, id) => {
    if (type === "ADD") {
      const questionId = uuidv4();
      const newQuestion = {
        question_id: questionId,
        quiz_id: quizChoose,
        question_text: "",
        question_type: questionType,
        difficulty: quizLevel,
        answer: [
          {
            option_id: uuidv4(),
            option_text: "",
            is_correct: true,
            question_id: questionId,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => item.question_id !== id);
      setQuestions(questionClone);
    }
  };

  const handleActitonAnswer = (type, questionID, answerID) => {
    let answerClone = _.cloneDeep(questions);

    if (type === "ADD") {
      const newAnswer = {
        option_id: uuidv4(),
        option_text: "",
        is_correct: false,
        question_id: questionID,
      };
      let index = answerClone.findIndex(
        (item) => item.question_id === questionID
      );
      answerClone[index].answer.push(newAnswer);
      setQuestions(answerClone);
    }
    if (type === "REMOVE") {
      let index = answerClone.findIndex(
        (item) => item.question_id === questionID
      );
      answerClone[index].answer = answerClone[index].answer.filter(
        (item) => item.option_id !== answerID
      );
      setQuestions(answerClone);
    }
  };

  const handleOnChange = (type, questionID, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex(
        (item) => item.question_id === questionID
      );
      if (index > -1) {
        questionClone[index].question_text = value;
        setQuestions(questionClone);
      }
    }
  };

  const handleOnChangeAnswer = (type, questionID, answerID, value) => {
    let answerClone = _.cloneDeep(questions);
    let index = answerClone.findIndex(
      (item) => item.question_id === questionID
    );
    if (index > -1) {
      // co  nsole.log("tyope", type);
      answerClone[index].answer = answerClone[index].answer.map((answer) => {
        if (answer.option_id === answerID) {
          if (type === "INPUT_ANSWER") {
            answer.option_text = value;
          }
        }

        return answer;
      });
      setQuestions(answerClone);
    }
  };
  const handleOnChangeAnswerOption = (type, value, questionID, answerIndex) => {
    console.log(type, value, questionID, answerIndex);
    let answerClone = _.cloneDeep(questions);
    let questionIndex = answerClone.findIndex(
      (item) => item.question_id === questionID
    );

    if (questionIndex > -1) {
      // Cập nhật tất cả các câu trả lời, chỉ cho phép một câu trả lời đúng
      answerClone[questionIndex].answer = answerClone[questionIndex].answer.map(
        (answer, idx) => {
          return {
            ...answer,
            is_correct:
              idx === answerIndex ? (value === "1" ? true : false) : false, // Chỉ một câu trả lời có thể là đúng
          };
        }
      );

      setQuestions(answerClone);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionClone = _.cloneDeep(questions);
    //validate question - answer
    questionClone.forEach((item, index) => {
      if (item.quiz_id.length <= 0) {
        return toast.error("You have not selected category quiz");
      }
      if (item.question_text.length <= 0) {
        return toast.error("This question text field cannot be left blank");
      }
      item.answer.forEach((item, index) => {
        if (item.option_text.length <= 0) {
          return toast.error(
            `This answer text field ${index + 1} cannot be left blank`
          );
        }
      });
    });

    try {
      const res = await postQuestion(questions);
      console.log("res", res);
      if (res.codeStatus === 201) {
        props.onHide(); // Đóng modal

        // Reset lại các trường sau khi submit thành công
        setQuestions([
          {
            question_id: uuidv4(),
            quiz_id: "",
            question_text: "",
            question_type: "multiple_choice",
            difficulty: "easy",
            answer: [
              {
                option_id: uuidv4(),
                option_text: "",
                is_correct: true,
                question_id: questionId,
              },
              {
                option_id: uuidv4(),
                option_text: "",
                is_correct: false,
                question_id: questionId,
              },
            ],
          },
        ]);

        return toast.success(res.message || "Submit successful");
      } else {
        return toast.error("Submit failed"); // Thông báo lỗi nếu submit không thành công
      }
    } catch (error) {
      console.log("Error:", error);
      handleErrorResponse(error); // Handle the error response appropriately
      return toast.error("An error occurred while submitting"); // Xử lý lỗi
    }
  };

  return (
    <Modal {...props} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal create new questions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="select__items row">
          <div className="select-level col-3">
            <label>
              Level quiz
              <select
                name="selectedFruit"
                className="px-3 mt-2 mb-3 mx-3"
                onChange={(e) => setQuizzLevel(e.target.value)}
              >
                {level &&
                  level.map((items, index) => (
                    <option value={items} key={index}>
                      {items}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="select-category col-4 ">
            <label>
              Question type
              <select
                name="selectedFruit"
                className="px-3 mt-2 mb-3 mx-3"
                onChange={(e) => setQuestionType(e.target.value)}
              >
                {question_type &&
                  question_type.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="select-category col-5 ">
            <label>
              Select quiz
              <select
                name="selectedFruit"
                className="px-3 mt-2 mb-3 mx-3"
                onChange={(e) => setQuizzChoose(e.target.value)}
              >
                <option value="">Selection</option>
                {dataquiz &&
                  dataquiz.map((item, index) => (
                    <React.Fragment key={index}>
                      <option value={item.quiz_id}>
                        {item.title}
                        {" - "}
                        <React.Fragment>
                          {timeAgo(item.created_at)}
                        </React.Fragment>
                      </option>
                    </React.Fragment>
                  ))}
              </select>
            </label>
          </div>
        </div>
        <form action="" className="form" onSubmit={handleSubmit}>
          {questions &&
            questions.map((question, index) => (
              <div className="form-question" key={index}>
                <hr color="#fff" />
                <div className="form__enter_question  d-flex align-items-center justify-content-center">
                  <InputField
                    value={question.question_text}
                    placeholder={`Enter Question ${index + 1}`}
                    onChange={(e) =>
                      handleOnChange(
                        "QUESTION",
                        question.question_id,
                        e.target.value
                      )
                    }
                  />
                  <span className="col-2 gap-2 text-center mx-auto d-flex align-items-center justify-content-center">
                    {questions.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          handleActionQuestion("REMOVE", question.question_id)
                        }
                      >
                        <IoMdRemoveCircle size={20} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleActionQuestion("ADD", "")}
                    >
                      <MdOutlineAddCircle size={20} />
                    </button>
                  </span>
                </div>
                <ul className="form__enter__result">
                  {question.answer.map((answer, index) => (
                    <li className="row " key={index + 1}>
                      <span className="col-8 ">
                        <InputField
                          value={answer.option_text}
                          placeholder={`Enter answer ${index + 1}`}
                          onChange={(e) =>
                            handleOnChangeAnswer(
                              "INPUT_ANSWER",
                              question.question_id,
                              answer.option_id,
                              e.target.value
                            )
                          }
                        />
                      </span>
                      <span className="col-2">
                        <Answer
                          value={answer.is_correct ? "1" : "0"} // Truyền "1" nếu đúng, "0" nếu sai
                          onChange={(e) =>
                            handleOnChangeAnswerOption(
                              "OPTION_ANSWER",
                              e,
                              question.question_id,
                              index // Truyền thêm vị trí index của câu trả lời
                            )
                          }
                        />
                      </span>
                      <span className="col-2 gap-2 text-center mx-auto d-flex align-items-center justify-content-center">
                        {question.answer.length > 2 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              handleActitonAnswer(
                                "REMOVE",
                                question.question_id,
                                answer.option_id
                              )
                            }
                          >
                            <IoMdRemoveCircle size={15} />
                          </button>
                        )}
                        {question.answer.length < 4 && (
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              handleActitonAnswer("ADD", question.question_id)
                            }
                          >
                            <MdOutlineAddCircle size={15} />
                          </button>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          <Modal.Footer>
            <Button onClick={props.onHide} className="btn btn-light">
              Close
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function Answer({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value); // Call onChange with the selected value
  };

  return (
    <FormControl className="d-flex">
      <FormLabel>Answer</FormLabel>
      <RadioGroup value={value} onChange={handleChange} className="row">
        <div className="row">
          <span className="col-6">
            <FormControlLabel
              value="0" // NO option (false)
              control={<Radio />}
              label="NO"
              className="col-6"
            />
          </span>
          <span className="col-6">
            <FormControlLabel
              value="1" // YES option (true)
              control={<Radio />}
              label="YES"
              className="col-6"
            />
          </span>
        </div>
      </RadioGroup>
    </FormControl>
  );
}

export default ModalCreateQuestion;
