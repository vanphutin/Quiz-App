import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../assets/image/avatar-user.jpg";
import { USER_LOGOUT_SUCCESS } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { DataQuesContext } from "../../../context/DataQuesContext";

function UserDropDown(props) {
  const user = useSelector((state) => state.user.account);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { setError } = useContext(DataQuesContext);

  const handleLogout = () => {
    navigator("/login");
    dispatch(USER_LOGOUT_SUCCESS());
    setError("Request failed with status code 403");
  };

  return (
    <Dropdown onSelect={() => {}}>
      <Dropdown.Toggle
        variant="dark"
        bg="dark"
        id="dropdown-basic"
        aria-label="User Menu"
      >
        <img
          src={avatar}
          alt="User Avatar"
          width="30px"
          className="user-avatar"
        />
        <span className="px-1">{props.username}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu rootCloseEvent="mousedown">
        {(user?.role === "admin" || user?.role === "instructor") && (
          <Dropdown.Item>
            <Link
              to="/admin?tab=dashboard"
              className="dropdown-item"
              data-rr-ui-dropdown-item
              onClick={() => {}}
            >
              Admin
            </Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item>
          <Link
            to="/me/history-quiz"
            className="dropdown-item"
            data-rr-ui-dropdown-item
            onClick={() => {}}
          >
            History Test
          </Link>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {}}>_______</Dropdown.Item>

        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;
