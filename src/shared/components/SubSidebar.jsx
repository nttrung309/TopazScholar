import React, { useState } from "react";
import { Input, Button } from "antd";
import { Link, useLocation } from "react-router-dom";

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

const SubSidebar = () => {
  const location = useLocation();
  var submenu = location.pathname.slice(1);

  return (
    <div className="sub-sidebar">
      <Input
        size="large"
        placeholder="Tìm kiếm hoạt động"
        suffix={<i className="bi bi-search" />}
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
      <Button type="primary" size="large" icon={<i className="bi bi-plus" />}>
        Tạo hoạt động mới
      </Button>
    </div>
  );
};

export default SubSidebar;
