import React from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";

const SubSidebar = () => {
  return (
    <div className="sub-sidebar">
      <Input
        size="large"
        placeholder="Tìm kiếm hoạt động"
        suffix={<i className="bi bi-search" />}
      />
      <div className="sub-menu">
        <Link to="/explore" className="active">
          Khám phá
        </Link>
        <Link to="/">Đã đăng ký tham gia</Link>
        <Link to="/">Tổ chức</Link>
        <Link to="/">Đã tham gia</Link>
      </div>
      <Button type="primary" size="large" icon={<i className="bi bi-plus" />}>
        Tạo hoạt động mới
      </Button>
    </div>
  );
};

export default SubSidebar;
