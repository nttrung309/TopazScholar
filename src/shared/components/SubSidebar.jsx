import React, { useState } from "react";
import { Input, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const submenus = [
  { label: "Khám phá", path: "/explore", title: "Khám phá" },
  {
    label: "Đã đăng ký tham gia",
    path: "/registered",
    title: "Hoạt động bạn đã đăng ký tham gia",
  },
  { label: "Tổ chức", path: "/hosting", title: "Hoạt động bạn tổ chức" },
  { label: "Đã tham gia", path: "/joined", title: "Hoạt động bạn đã tham gia" },
];

const SubSidebar = (props) => {
  const location = useLocation();
  var submenu = location.pathname.slice(1);
  const setSearchInput = props.onChange;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="sub-sidebar">
      <Input
        size="large"
        placeholder="Tìm kiếm hoạt động"
        suffix={<i className="bi bi-search" />}
        onChange={handleInputChange}
      />
      <div className="sub-menu">
        {submenus.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={item.path.slice(1) === submenu ? "active" : ""}
            onClick={() => {
              submenu = item.label;
            }}
            state={{ item }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Button type="primary" size="large" icon={<i className="bi bi-plus" />} onClick={() => navigate('/activity/create')}>
        Tạo hoạt động mới
      </Button>
    </div>
  );
};

export default SubSidebar;
