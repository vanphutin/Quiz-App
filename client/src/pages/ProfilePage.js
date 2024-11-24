import React, { useState } from "react";
import "../assets/style/pages/_ProfilePage.scss"; // Import the SCSS file
import { useSelector } from "react-redux";
import avatar from "../assets/image/avatar-user.jpg";
import NotFoundPage from "./NotFoundPage";
import ModalUpdateUser from "../components/profile/ModalUpdateUser";
import { CiWarning } from "react-icons/ci";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.account);
  const [show, setShow] = useState(false);

  if (!user || user?.user_id === "") {
    return <NotFoundPage />;
  }

  const handleUpdateUser = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <div className="profile-container container mt-5">
      <img
        src={user.avatar || avatar}
        alt="Avatar"
        className="profile-avatar"
      />
      <h1 className="profile-name">
        {user.firstname} {user.lastname}
      </h1>
      <div className="profile-info">
        <p>
          <span className="info-label">Username: </span>
          <span className="info-value">{user.username}</span>
        </p>
        <p>
          <span className="info-label">School: </span>
          <span className="info-value">{user.school}</span>
        </p>
        <p>
          <span className="info-label">Email: </span>
          <span className="info-value">{user.email}</span>
        </p>
        <p>
          <span className="info-label">Gender: </span>
          <span className="info-value">
            {user.gender === 0 ? "Male" : "Female"}
          </span>
        </p>
      </div>
      <div className="button-edit d-flex  justify-content-between align-center">
        <p className="waring-edit">
          <CiWarning size={30} /> After updating, please log out and log in to
          display the data.
        </p>
        <button onClick={handleUpdateUser} className="edit-button">
          Edit
        </button>
      </div>
      <ModalUpdateUser data={user} show={show} handleClose={handleClose} />
    </div>
  );
};

export default ProfilePage;
