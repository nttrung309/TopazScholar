import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (value) => {
    setCollapsed(value);
  };

  return (
    <div className="main-layout">
      <SideBar collapsed={collapsed} menus={menus} />
      <div className={`main-container${collapsed ? " collapsed" : ""}`}>
        <Header collapsed={collapsed} handleCollapsed={handleCollapsed} />
        {children}
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
];

export default MainLayout;
