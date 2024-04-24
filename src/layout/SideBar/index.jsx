import { ReactSVG } from "react-svg";
import LogoIcon from "../../shared/asset/icon/logo.svg";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ collapsed }) => {
  return (
    <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <ReactSVG className="logo" src={LogoIcon} />
      <div className="menu">
        <Link to="/" className="active">
          <i className="bi bi-house" />
          {/* <i class="bi bi-house-fill"/> */}
          <span className="label">Trang chủ</span>
        </Link>

        <Link to="/explore">
          <i className="bi bi-lightning" />
          {/* <i class="bi bi-lightning-fill"/> */}
          <span className="label">Hoạt động</span>
        </Link>

        <Link to="/calendar">
          <i className="bi bi-table" />
          <span className="label">Lịch</span>
        </Link>

        <Link to="/contact">
          <i className="bi bi-cursor" />
          {/* <i class="bi bi-cursor-fill"/> */}
          <span className="label">Trò chuyện</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
