import React, { useState } from "react";
import { Button, Dropdown, Badge } from "antd";

const userDropdownItems = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a onClick={() => {}}>
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Đăng xuất
      </a>
    ),
  },
];

const Header = ({ collapsed, handleCollapsed }) => {
  const [count, setCount] = useState(5);

  return (
    <div className="header">
      <Button
        className="collapse"
        style={{ height: "64px", width: "64px" }}
        type="text"
        icon={
          collapsed ? (
            <i className="bi bi-arrow-bar-right" />
          ) : (
            <i className="bi bi-arrow-bar-left" />
          )
        }
        onClick={() => handleCollapsed(!collapsed)}
      />

      <div className="header__right">
        <Badge size="small" count={count} offset={[-10, 10]}>
          <i className="bi bi-bell"></i>
        </Badge>

        <Dropdown trigger={["click"]} menu={{ items: userDropdownItems } } placement="bottomRight">
          <Button>
            {/* Chèn img vào class image*/}
            <div className="information">
              <div className="information__name">Nguyen Ngoc Trinh</div>
              <div className="information__class">KTPM2020</div>
            </div>
            <div className="image"></div>
            <i className="bi bi-chevron-down"></i>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
