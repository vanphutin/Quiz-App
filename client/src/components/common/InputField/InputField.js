import React from "react";
import Form from "react-bootstrap/Form";
import "./__InputField.scss";

const InputField = ({
  className,
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  size,
}) => {
  return (
    <Form.Group className={`input-group mb-3 ${className}`}>
      <div style={{ width: "100%" }}>
        <Form.Label>{label}</Form.Label>
      </div>
      <Form.Control
        size={size}
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Form.Group>
  );
};

export default InputField;
