import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputField from "../common/InputField/InputField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { handleErrorResponse } from "../common/errorHandler/errorHandler";

const bgStyle = {
  background: "#34373d",
  fontFamily: "Inter, sans-serif",
  border: "none",
};

const FormEnterOTP = (props) => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiVeryfiyOtp = async (email, otp) => {
    setIsLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      const user_id = res?.user_id;
      if (res.codeStatus === 200) {
        // Changed to 201 to reflect successful OTP creation
        navigate("/recover/password", { state: { user_id } });
      } else if (res.codeStatus === 400) {
        toast.error(res.message || "OTP expired or invalid");
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
    if (!email) {
      setErrors({ otp: "An error occurred, please try again" });
      return;
    }
    if (otp.length === 0) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    if (otp.length !== 6) {
      setErrors({ otp: "Invalid OTP" });
      return;
    }
    if (!/^\d+$/.test(otp) || otp.length !== 6) {
      setErrors({ otp: "Invalid OTP. It must be a 6-digit number." });
      return;
    }
    setErrors({});

    //Bắt lỗi OTP không hợp lệ từ server

    // Proceed with OTP validation here
    // On successful validation:
    // Redirect to the next page if OTP is correct
    fetchApiVeryfiyOtp(email, otp);
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
          Enter security code
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={bgStyle}>
        <span className="modal-descript" style={{ color: "#94a0b8" }}>
          Please check your email for the code. It is 6 digits long.
          <p className="m-0">
            {"Check email "}
            <i>
              <b> {email || "not provided"}</b>
            </i>
          </p>
        </span>
        <InputField
          type="text"
          placeholder="Enter OTP"
          name="otp"
          value={otp}
          disabled={!email}
          onChange={(e) => setOtp(e.target.value)}
          error={errors.otp}
        />
        {errors.otp && <p style={{ color: "red" }}>{errors.otp}</p>}
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

export default FormEnterOTP;
