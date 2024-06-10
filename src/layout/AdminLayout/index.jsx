import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

const AdminLayout = ({ children }) => {
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

export default AdminLayout;

const menus = [
  {
    name: "statistics",
    label: "Thống kê",
    icon: "bi bi-bar-chart",
    iconActive: "bi bi-bar-chart-fill",
    path: "/admin/statistics",
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
    iconActive: "bi bi-person-circle",
    path: "/admin/account",
    role: "admin",
  },
  {
    name: "home",
    label: "Trang chủ",
    icon: "bi bi-house",
    iconActive: "bi bi-house-fill",
    path: "/",
    role: "student",
  },
];
