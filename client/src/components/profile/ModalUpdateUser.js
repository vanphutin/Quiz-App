import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateUser } from "../../services/apiUser";
import { toast } from "react-toastify";

function ModalUpdateUser({ data, show, handleClose }) {
  const [userData, setUserData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    school: "",
    user_id: data.user_id,
  });

  useEffect(() => {
    if (data) {
      setUserData({
        lastname: data.lastname,
        firstname: data.firstname,
        email: data.email,
        school: data.school,
        user_id: data.user_id,
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !userData.lastname ||
      !userData.firstname ||
      !userData.email ||
      !userData.school
    ) {
      return toast.error("Please fill in all fields.");
    }

    try {
      // Fetch API

      const res = await updateUser(
        userData.lastname,
        userData.firstname,
        userData.email,
        userData.school,
        userData.user_id
      );

      if (res.codeStatus === 200) {
        toast.success("User information updated successfully.");
        handleClose();
      } else {
        toast.error("Failed to update user information.");
      }
    } catch (error) {
      toast.error("An error occurred while updating user information.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={data?.username || ""}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstname"
              value={userData.firstname}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastname"
              value={userData.lastname}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formSchool">
            <Form.Label>School</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter school name"
              name="school"
              value={userData.school}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdateUser;
