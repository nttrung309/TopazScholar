import React from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsCursorFill, BsListUl, BsTelephoneFill } from "react-icons/bs";
import { Avatar, Input } from "antd";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-sidebar">
        <div className="page-title">
          <div className="title-icon">
            <BsCursorFill />
          </div>
          <div className="title-name">Trò chuyện</div>
        </div>
        <Input
          className="chat-search-bar"
          size="large"
          placeholder="Tìm kiếm trong trò truyện"
          suffix={<i className="bi bi-search" />}
        />
        <div className="users-group">
          <div className="contact-user-item">

          </div>
          <div className="contact-user-item">
            
          </div>
          <div className="contact-user-item">
            
          </div>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header__user-info">
            <Avatar size={52} src={require('../../shared/asset/image/contact/temp_avatar.jpg')}/>
            <div className="username">Nguyễn Thành Trung</div>
          </div>
          <div className="chat-header__control-group">
            <div className="control-item"><BsTelephoneFill className="phone" /></div>
            <div className="control-item"><BsListUl className="more-option"/></div>
          </div>
        </div>
        <div className="chat-content">

        </div>
        <div className="chat-input">

        </div>
      </div>

    </div>
  );
};

export default Contact;
