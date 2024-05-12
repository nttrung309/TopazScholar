import { ReactSVG } from "react-svg";
import LogoIcon from "../../shared/asset/icon/logo.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ collapsed }) => {
  const [active, setActive] = useState("home");

  return (
    <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <ReactSVG className="logo" src={LogoIcon} />
      <div className="menu">
        <Link
          to="/"
          className={active === "home" && "active"}
          onClick={() => setActive("home")}
        >
          {active === "home" ? (
            <i className="bi bi-house-fill" />
          ) : (
            <i className="bi bi-house" />
          )}
          <span className="label">Trang chủ</span>
        </Link>
        <Link
          to="/explore"
          className={active === "activity" && "active"}
          onClick={() => setActive("activity")}
        >
          {active === "activity" ? (
            <i className="bi bi-lightning-fill" />
          ) : (
            <i className="bi bi-lightning" />
          )}
          <span className="label">Hoạt động</span>
        </Link>
        <Link
          to="/calendar"
          className={active === "calendar" && "active"}
          onClick={() => setActive("calendar")}
        >
          <i className="bi bi-table" />
          <span className="label">Lịch</span>
        </Link>
        <Link
          to="/contact"
          className={active === "contact" && "active"}
          onClick={() => setActive("contact")}
        >
          {active === "contact" ? (
            <i className="bi bi-cursor-fill" />
          ) : (
            <i className="bi bi-cursor" />
          )}
          <span className="label">Trò chuyện</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
