import React, { useState } from "react";
import InputField from "../common/InputField/InputField";
import CommonButton from "../common/button/CommonButton";
import "./__SignUpForm.scss";
import { Link } from "react-router-dom";

const textStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "bold",
  color: "#94a0b8",
  fontSize: "0.9em",
};

const INIT_CODE_TEACHER = "321654";

const SignUpForm = ({ isLoading, setIsLoading, onSignup }) => {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    username: "",
    gender: "",
    role: "user",
    email: "",
    school: "",
    password: "",
    code: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Missing required field email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Missing required field password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password too short";
    }

    if (!formData.school) {
      newErrors.school = "Missing required field school";
    }

    if (!formData.firstname) {
      newErrors.firstname = "Missing required field first name";
    }

    if (!formData.lastname) {
      newErrors.lastname = "Missing required field last name";
    }

    if (!formData.username) {
      newErrors.username = "Missing required field user name";
    }

    if (!formData.gender) {
      newErrors.gender = "Missing required field gender";
    }

    if (formData.role === "instructor") {
      if (!formData.code) {
        newErrors.code =
          "Missing required field code, please contact the unit where you are working.";
      } else if (formData.code !== `${INIT_CODE_TEACHER}`) {
        newErrors.code =
          "Wrong teacher code, please contact the unit where you are working.";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    onSignup(formData);
    console.log("Form submitted");
  };
  return (
    <form action="" className="sign-up-form" onSubmit={handleSubmit}>
      <h1 className="text-center">Sign up</h1>
      <InputField
        label="User Name"
        type="text"
        name="username"
        value={formData.username}
        placeholder="Enter your user name"
        onChange={handleChange}
      />
      {errors.username && (
        <p className="error-field" style={{ color: "red" }}>
          {errors.username}
        </p>
      )}
      <div className="row d-md-flex">
        <div className="col-12 col-md-6 col-lg-6">
          <InputField
            label="Last Name"
            type="text"
            name="lastname"
            value={formData.lastname}
            placeholder="Enter your last name"
            onChange={handleChange}
          />
          {errors.lastname && (
            <p className="error-field" style={{ color: "red" }}>
              {errors.lastname}
            </p>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <InputField
            label="First Name"
            type="text"
            name="firstname"
            value={formData.firstname}
            placeholder="Enter your first name"
            onChange={handleChange}
          />
          {errors.firstname && (
            <p className="error-field" style={{ color: "red" }}>
              {errors.firstname}
            </p>
          )}
        </div>
      </div>
      <div
        className="d-md-flex justify-content-start align-items-center mb-2 py-2"
        style={textStyle}
      >
        <h6 className="mb-0 me-4">Gender</h6>
        <div className="form-check form-check-inline mb-0 me-4">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="femaleGender"
            value="0"
            onChange={handleChange}
            checked={formData.gender === "0"}
          />
          <label className="form-check-label" htmlFor="femaleGender">
            Female
          </label>
        </div>
        <div className="form-check form-check-inline mb-0 me-4">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="maleGender"
            value="1"
            onChange={handleChange}
            checked={formData.gender === "1"}
          />
          <label className="form-check-label" htmlFor="maleGender">
            Male
          </label>
        </div>
        {errors.gender && (
          <div className="error-field d-block" style={{ color: "red" }}>
            {errors.gender}
          </div>
        )}
      </div>

      <div
        className="option-role d-md-flex justify-content-start align-items-center mb-2 py-2"
        style={textStyle}
      >
        <h6 className="mb-0 me-4">Who are you?</h6>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-select"
          aria-label="Select your role"
        >
          <option value="user">Student</option>
          <option value="instructor">Teacher</option>
        </select>
        {formData.role === "instructor" && (
          <>
            <input
              type="number"
              name="code"
              value={formData.code}
              placeholder="Enter the teacher code"
              onChange={handleChange}
              className="form-control"
              size="50"
            />
          </>
        )}
      </div>
      <div style={{ paddingBottom: "10px" }}>
        {formData.role === "instructor" && errors.code && (
          <div className="error-field" style={{ color: "red" }}>
            {errors.code}
          </div>
        )}
      </div>
      <InputField
        label="School"
        type="text"
        name="school"
        value={formData.school}
        placeholder="Enter your school name"
        onChange={handleChange}
      />
      {errors.school && (
        <p className="error-field" style={{ color: "red" }}>
          {errors.school}
        </p>
      )}
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        placeholder="Enter your email"
        onChange={handleChange}
      />
      {errors.email && (
        <p className="error-field" style={{ color: "red" }}>
          {errors.email}
        </p>
      )}
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        placeholder="Enter your password"
        onChange={handleChange}
      />
      {errors.password && (
        <p className="error-field" style={{ color: "red" }}>
          {errors.password}
        </p>
      )}
      <CommonButton
        type="submit"
        className={"btn-dark mt-2 w-100"}
        isLoading={isLoading}
      >
        Sign Up
      </CommonButton>
      <p className="callout callout-signup mt-3 text-end">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
