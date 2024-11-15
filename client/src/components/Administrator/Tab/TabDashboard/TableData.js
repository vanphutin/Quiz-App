import { useState } from "react";
import Table from "react-bootstrap/Table";
import ModelDeleteUser from "./ModelDeleteUser";
import "./__TableData.scss";

function TableData(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = props.data;

  // Open delete modal and set selected user
  const handleShowDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // Confirm delete and call parent delete function
  const handleConfirmDelete = () => {
    if (selectedUser) {
      props.handleDeleteUser(selectedUser.user_id);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>Username</th>
            <th>Last Name</th>
            <th>First name</th>
            <th>School</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.lastname}</td>
                <td>{item.firstname}</td>
                <td>{item.school}</td>
                <td>{item.email}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{item.role}</td>
                <td className="d-flex">
                  <button type="button" className="btn btn-dark">
                    View
                  </button>
                  <button
                    type="button"
                    disabled={item.role === "admin"}
                    className="btn btn-danger"
                    onClick={() => handleShowDeleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {selectedUser && (
        <ModelDeleteUser
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
          username={selectedUser.username}
        />
      )}
    </>
  );
}

export default TableData;

// kiểm tra user đã bị xoá chưa, nếu rồi -> ko cho login -> đá lỗi "USER_DELETED"
