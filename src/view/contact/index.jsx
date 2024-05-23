import React, { useEffect, useState } from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsCursorFill, BsListUl, BsTelephoneFill } from "react-icons/bs";
import { Avatar, Input } from "antd";

import ChatInput from "./components/ChatInput";
import ContactItem from "./components/ContactItem";
import MessageHolder from "./components/MessageHolder";

import { useDispatch, useSelector } from "react-redux";

import { AuthUIDSelector } from "../../redux/auth/userSelector";
import { MessageDataSelector } from "../../redux/contact/contactSelector";
import { ContactGetAllMessage } from "../../redux/contact/contactThunk";

const Contact = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(AuthUIDSelector);
  const messages = useSelector(MessageDataSelector);
  
  useEffect(() => {
    if(currentUserId){
      GetMessageData();
    }
  }, [currentUserId])

  const GetMessageData = async () => {
    await dispatch(ContactGetAllMessage({ id: currentUserId }))
  }

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
          {messages?.map(msg => (
            <MessageHolder isMyMessage={(msg.senderID === currentUserId)} content={msg.content} sendTime={msg.sendTime}/>
          ))}
        </div>
        <ChatInput/>
      </div>

    </div>
  );
};

export default Contact;
