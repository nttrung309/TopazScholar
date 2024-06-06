import React, { useEffect, useState } from "react";

import { Button, Dropdown, Badge, Avatar, Popover } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { authLogOut } from "../../redux/auth/userAction";
import { UserDataSelector } from "../../redux/auth/userSelector";
import { NotifyDataSelector } from "../../redux/notify/notifySelector";
import { NotifyGetAllData } from "../../redux/notify/notifyThunk";


import NotifyHolder from "./components/NotifyHolder";


const Header = ({ collapsed, handleCollapsed }) => {
  const dispatch  = useDispatch();

  const userData = useSelector(UserDataSelector);
  const notifyData = useSelector(NotifyDataSelector);

  const [countNotify, setCountNotify] = useState(0);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  useEffect(() => {
    LoadNotifyData();
  }, []);

  useEffect(() => {
    setCountNotify(notifyData.filter(item => !item.isRead).length)
  }, [notifyData])

  const LoadNotifyData = async () => {
    await dispatch(NotifyGetAllData({id: userData.uid}));
  }

  const userDropdownItems = [
    {
      key: "1",
      label: (
        <a className="user-dropdown-item" target="_blank" rel="noopener noreferrer" href="">
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a className="user-dropdown-item" onClick={() => {}}>
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a className="user-dropdown-item log-out" rel="noopener noreferrer" onClick={() => {dispatch(authLogOut())}}>
          <LoginOutlined />
          Đăng xuất
        </a>
      ),
    },
  ];

  const HandleOpenNotifyWindow = (newOpen) => {
    setIsNotifyOpen(newOpen);
  }

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
        <Popover
        placement="bottomRight"
        content={<NotifyHolder/>}
        trigger="click"
        open={isNotifyOpen}
        onOpenChange={HandleOpenNotifyWindow}>
          <Badge size="small" count={countNotify} offset={[-10, 10]}>
            <i className="bi bi-bell"></i>
          </Badge>
        </Popover>

        <Dropdown trigger={["click"]} menu={{ items: userDropdownItems } } placement="bottomRight">
          <Button>
            {/* Chèn img vào class image*/}
            <div className="information">
              <div className="information__name">{userData.name}</div>
              <div className="information__class">{userData.class}</div>
            </div>
            {userData.avatar !== '' ? (
              <Avatar src={userData.avatar} />
            ) : (
              <Avatar>{userData.name[0].toUpperCase()}</Avatar>
            )}
            <i className="bi bi-chevron-down"></i>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
