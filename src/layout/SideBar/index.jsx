import React from "react";
import { ReactSVG } from "react-svg";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoIcon from "../../shared/asset/icon/logo.svg";
import { AuthRoleSelector } from "../../redux/auth/userSelector";

const SideBar = ({ collapsed, menus }) => {
  const path = useLocation().pathname;
  const authRole = useSelector(AuthRoleSelector);

  return (
    <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <ReactSVG className="logo" src={LogoIcon} />
      <div className="menu">
        {menus
          .map((item, index) => (
            <NavLink key={index} to={item.path}>
              <i className={path === item.path ? item.iconActive : item.icon} />
              <span className="label">{item.label}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SideBar;
