import { ReactSVG } from "react-svg";
import LogoIcon from "../../shared/asset/icon/logo.svg";
import React from "react";

const SideBar = ({ collapsed }) => {
  return (
    <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <ReactSVG className="logo" src={LogoIcon} />
      <div className="menu">
        <div className="item active">
          <i class="bi bi-house" />
          {/* <i class="bi bi-house-fill"/> */}
          <span className="label">Trang chủ</span>
        </div>
        <div className="item">
          <i class="bi bi-lightning" />
          {/* <i class="bi bi-lightning-fill"/> */}
          <span className="label">Hoạt động</span>
        </div>
        <div className="item">
          <i className="bi bi-table" />
          <span className="label">Lịch</span>
        </div>
        <div className="item">
          <i className="bi bi-cursor" />
          {/* <i class="bi bi-cursor-fill"/> */}
          <span className="label">Trò chuyện</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
