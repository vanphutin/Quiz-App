import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputField from "../common/InputField/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../common/errorHandler/errorHandler";

const bgStyle = {
  background: "#34373d",
  fontFamily: "Inter, sans-serif",
  border: "none",
};

const ModalEnterNewPass = (props) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id;
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiResetPassword = async (user_id, newPassword) => {
    setIsLoading(true);
    try {
      const res = await resetPassword(user_id, newPassword);
      if (res.codeStatus === 200) {
        // Changed to 201 to reflect successful OTP creation
        toast.success("Password reset successfully");
        navigate("/login");
      } else if (res.codeStatus === 400) {
        toast.error(res.message || "Error when reset password");
      } else {
        console.log("OTP Failed:", res.message);
        toast.error(res.message || "OTP Failed");
      }
    } catch (error) {
      console.log("error", error);
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle submit form enter OTP
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (newPassword.length <= 0) {
      setErrors({ newPassword: "Password is required" });
      return;
    }
    if (!newPassword) {
      setErrors({ newPassword: "An error occurred, please try again" });
      return;
    }
    if (newPassword.length <= 6) {
      setErrors({ newPassword: "Password too short" });
      return;
    }

    setErrors({});
    fetchApiResetPassword(user_id, newPassword);
    //Bắt lỗi OTP không hợp lệ từ server

    // Proceed with OTP validation here
    // On successful validation:
    // navigate("/nextPage"); // Redirect to the next page if OTP is correct
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
          Create new a password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={bgStyle}>
        <span className="modal-descript" style={{ color: "#94a0b8" }}>
          Create a new password that is at <b>least 6 characters long</b>. A
          strong password is a combination of letters, numbers, and punctuation.
        </span>
        <InputField
          type="password"
          placeholder="Enter new password"
          name="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={errors.newPassword}
        />
        {errors.newPassword && (
          <p style={{ color: "red" }}>{errors.newPassword}</p>
        )}
      </Modal.Body>
      <Modal.Footer style={bgStyle}>
        <Link to="/login">
          <Button className="btn-light">Cancel</Button>
        </Link>
        <Button
          type="submit"
          className="btn-primary"
          onClick={handleSubmitForm}
        >
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEnterNewPass;
