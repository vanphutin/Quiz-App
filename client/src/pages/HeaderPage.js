import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Header/Logo/Logo";
import Navigation from "../components/Header/Nav/Navigation";
import Auth from "../components/Header/Auth/Auth";
import "../assets/style/pages/_HeaderPage.scss";
import { IoIosMenu } from "react-icons/io";

const HeaderPage = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible((prevState) => !prevState);
  };
  const handleLinkClick = () => {
    // Đóng menu khi một liên kết được nhấp
    setMenuVisible(false);
  };

  return (
    <>
      <div className="header container my-2">
        <div className="header__item d-flex align-items-center justify-content-center row">
          <div className="header__item-logo col-4">
            <Logo />
          </div>
          <div
            className="header__item-menu d-block d-sm-none col-8 text-end"
            onClick={handleMenuToggle}
          >
            <IoIosMenu fontSize="2rem" />
          </div>
          <div
            className={`header-items col-8 ${
              menuVisible ? "menu-visible" : "menu-hidden"
            }`}
          >
            <div className="header__item-navigation">
              <Navigation handleLinkClick={handleLinkClick} />
            </div>
            <div className="header__item-auth">
              <Auth />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default HeaderPage;
