import Dropdown from "react-bootstrap/Dropdown";
import avatar from "../../../assets/image/avatar-user.jpg";
import { USER_LOGOUT_SUCCESS } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function UserDropDown(props) {
  const user = useSelector((state) => state.user.account);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigator("/login");
    dispatch(USER_LOGOUT_SUCCESS());
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
        <img src={avatar} alt="" width="30px" style={{ marginRight: "10px" }} />
        {props.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(user?.role === "admin" || user?.role === "instructor") && (
          <Dropdown.Item href="/admin?tab=dashboard">Admin</Dropdown.Item>
        )}
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>

        <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;
