import React, { useState } from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsCursorFill, BsListUl, BsTelephoneFill } from "react-icons/bs";
import { Avatar, Input } from "antd";
import ChatInput from "./components/ChatInput";
import ContactItem from "./components/ContactItem";
import MessageHolder from "./components/MessageHolder";

const Contact = () => {
  const [testChatContent, setTestChatContent] = useState([
    {
      isMyMessage: false, //So sánh id với currentUserId
      content: 'Chào bạn',
      sendTime: '15h00 25/4'
    },
    {
      isMyMessage: true,
      content: 'Mình có thể giúp gì cho bạn?',
      sendTime: '15h02 25/4'
    },
    {
      isMyMessage: false,
      content: 'Không có gì',
      sendTime: '15h04 25/4'
    },
    {
      isMyMessage: false,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent semper feugiat rutrum. Morbi at mauris quis dui egestas euismod. Donec hendrerit sagittis arcu eget pellentesque. Phasellus tortor leo, egestas eget enim in, iaculis ornare felis. Cras porttitor eleifend nibh eget vestibulum. Nulla a sapien id nulla aliquam efficitur vel quis nulla. Vestibulum massa ligula, hendrerit a mollis non, scelerisque dignissim leo. Suspendisse mattis eleifend lectus. Donec neque sem, placerat non sagittis a, accumsan eu est. Nam vel enim sit amet ipsum pretium egestas id et augue. Pellentesque nisl libero, cursus vel ante ut, cursus molestie velit. Aliquam erat volutpat. Pellentesque eleifend eget justo sed imperdiet. Cras tempus vel purus eget tincidunt. Etiam fringilla id justo sed aliquet. Praesent at dolor condimentum, blandit nisl a, semper ex.',
      sendTime: '15h04 25/4'
    },
    {
      isMyMessage: true,
      content: '😑😑😑 ??',
      sendTime: '15h05 25/4'
    },
    {
      isMyMessage: true,
      content: '',
      file: '.',
      sendTime: '15h06 25/4'
    }
  ]);

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
        <div className="users-contact-group">
          <ContactItem selected/>
          <ContactItem/>
          <ContactItem/>
          <ContactItem/>
          <ContactItem/>
          <ContactItem/>
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
          {testChatContent.map(item => (
            <MessageHolder isMyMessage={item.isMyMessage} content={item.content} sendTime={item.sendTime} file={item.file}/>
          ))}
        </div>
        <ChatInput/>
      </div>

    </div>
  );
};

export default Contact;
