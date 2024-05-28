import React from "react";
import { ReactSVG } from "react-svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoIcon from "../../shared/asset/icon/logo.svg";
import { AuthRoleSelector } from "../../redux/auth/userSelector";

const SideBar = ({ collapsed }) => {
  const path = useLocation().pathname;
  const authRole = useSelector(AuthRoleSelector);

  return (
    <div className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <ReactSVG className="logo" src={LogoIcon} />
      <div className="menu">
        {menus
          .filter((menu) => menu.role === authRole)
          .map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={path === item.path && "active"}
            >
              <i className={path === item.path ? item.iconActive : item.icon} />
              <span className="label">{item.label}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

const menus = [
  {
    name: "home",
    label: "Trang chủ",
    icon: "bi bi-house",
    iconActive: "bi bi-house-fill",
    path: "/",
    role: "student",
  },
  {
    name: "activity",
    label: "Hoạt động",
    icon: "bi bi-lightning",
    iconActive: "bi bi-lightning-fill",
    path: "/explore",
    role: "student",
  },
  {
    name: "calendar",
    label: "Lịch",
    icon: "bi bi-table",
    iconActive: "bi bi-table",
    path: "/calendar",
    role: "student",
  },
  {
    name: "contact",
    label: "Trò chuyện",
    icon: "bi bi-cursor",
    iconActive: "bi bi-cursor-fill",
    path: "/contact",
    role: "student",
  },
  {
    name: "statistic",
    label: "Thống kê",
    icon: "bi bi-bar-chart",
    iconActive: "bi bi-bar-chart-fill",
    path: "/admin",
    role: "admin",
  },
  {
    name: "activity",
    label: "Quản lý hoạt động",
    icon: "bi bi-lightning",
    iconActive: "bi bi-lightning-fill",
    path: "/admin/activity",
    role: "admin",
  },
  {
    name: "reminder",
    label: "Quản lý lịch nhắc",
    icon: "bi bi-bell",
    iconActive: "bi bi-bell-fill",
    path: "/admin/reminder",
    role: "admin",
  },
  {
    name: "supplies",
    label: "Quản lý vật tư",
    icon: "bi bi-plug",
    iconActive: "bi bi-plug-fill",
    path: "/admin/supplies",
    role: "admin",
  },
  {
    name: "account",
    label: "Quản lý tài khoản",
    icon: "bi bi-person-circle",
    iconActive: "bi bi-person-circle-fill",
    path: "/admin/account",
    role: "admin",
  },
];

export default SideBar;
