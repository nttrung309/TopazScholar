import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

const MainLayout = ({ children}) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (value) => {
    setCollapsed(value);
  };

  return (
    <div className="main-layout">
      <SideBar collapsed={collapsed} />
      <div className={`main-container${collapsed ? " collapsed" : ""}`}>
        <Header collapsed={collapsed} handleCollapsed={handleCollapsed} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
