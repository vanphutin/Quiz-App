import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../Header/Logo/Logo";
import { MdOutlineMenu, MdHome, MdQuiz, MdDashboard } from "react-icons/md";
import { SiQuizlet } from "react-icons/si";
import "./__SideNavBar.scss";
import { useSelector } from "react-redux";

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user.account);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar_logo">
        <div className="sidebar_logo__main">
          <Logo />
        </div>
        <div className="sidebar_logo__menu" onClick={toggleSidebar}>
          <MdOutlineMenu size={30} />
        </div>
      </div>
      <hr />
      <ul className="sidebar_nav">
        {user && user.role === "admin" && (
          <li data-toggle="tooltip" data-placement="right" title="Dashboard">
            <NavLink to="/admin?tab=dashboard">
              <MdDashboard size={30} />
              <p>Dashboard </p>
            </NavLink>
          </li>
        )}
        <li data-toggle="tooltip" data-placement="right" title="Quizzes">
          <NavLink to="/admin?tab=quiz">
            <MdQuiz size={30} />
            <p>Quizzes</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
