import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import "./__HeaderBackTo.scss";
const HeaderBackTo = ({ moreText }) => {
  return (
    <>
      <header className="header container-fluid header__back d-flex align-items-center justify-content-between px-5 mt-3 ">
        <Link to="/">
          {" "}
          <button className="header__back-home ">
            <p className="text-center m-0">
              <IoMdArrowRoundBack /> Back to home
            </p>
          </button>
        </Link>
        <div className="header__back-more">{moreText}</div>
      </header>
      <Outlet />
    </>
  );
};

export default HeaderBackTo;
