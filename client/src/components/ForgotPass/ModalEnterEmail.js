import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputField from "../common/InputField/InputField";
import { useState } from "react";
import CommonButton from "../common/button/CommonButton";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/apiAuth";
import { handleErrorResponse } from "../common/errorHandler/errorHandler";
import { toast } from "react-toastify";

const bgStyle = {
  background: "#34373d",
  fontFamily: "Inter, sans-serif",
  border: "none",
};

function ModalEnterEmail(props) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to fetch forgot password API
  const fetchApiForgotPassword = async (email) => {
    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.codeStatus === 201) {
        // Changed to 201 to reflect successful OTP creation
        navigate("/recover/code", { state: { email } });
      } else if (res.codeStatus === 400) {
        toast.error(res.message || "Email does not exist");
      } else {
        console.log("Failed:", res.message);
        toast.error(res.message || "Failed");
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit form when the user enters an email
  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Invalid email format" });
      return;
    }

    setErrors({});
    fetchApiForgotPassword(email);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
    >
      <Modal.Header style={bgStyle}>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bolder">
          Reset password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={bgStyle}>
        <p className="modal-descript" style={{ color: "#94a0b8" }}>
          Enter your account's email address, and we'll send you a link to reset
          your password.
        </p>
        <form onSubmit={handleSubmitForm}>
          <InputField
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email} // Pass error message to InputField if it supports it
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer style={bgStyle}>
        <Link to="/login">
          <Button className="btn-light">Cancel</Button>
        </Link>
        <form onSubmit={handleSubmitForm}>
          <Button type="submit" className="btn-primary">
            Continue
          </Button>
        </form>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEnterEmail;
