import React from "react";
import { NavLink } from "react-router-dom";
import "./__Navigation.scss";

const Navigation = ({ handleLinkClick }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rank" // Update with correct route
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={handleLinkClick}
          >
            Rank
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about" // Update with correct route
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={handleLinkClick}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
