import React, { useEffect, useRef, useState } from "react";

import ActivityCard from "shared/components/ActivityCard";

import { BsCursorFill, BsListUl, BsTelephoneFill } from "react-icons/bs";
import { Avatar, Input, Select } from "antd";

import ChatInput from "./components/ChatInput";
import ContactItem from "./components/ContactItem";
import MessageHolder from "./components/MessageHolder";

import { useDispatch, useSelector } from "react-redux";

import { AuthUIDSelector } from "../../redux/auth/userSelector";
import { AllContactDataSelector, ContactDataSelector, MessageDataSelector, SelectedContactIDDataSelector } from "../../redux/contact/contactSelector";
import { ContactGetAllMessage, ContactGetAllUserData } from "../../redux/contact/contactThunk";
import { updateSelectedContactID } from "../../redux/contact/contactAction";

import socket from "../../shared/helper/Socket";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;


const Contact = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(AuthUIDSelector);
  const messages = useSelector(MessageDataSelector);
  const contactData = useSelector(ContactDataSelector);
  const selectedContactID = useSelector(SelectedContactIDDataSelector);
  const allContactData = useSelector(AllContactDataSelector);
  const [resetSelect, setResetSelect] = useState(0);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if(currentUserId){
      GetMessageData();
      GetAllUserData();
    }
  }, [currentUserId])

  useEffect(() => {
    if(selectedContactID == '' && contactData.length != 0){
      dispatch(updateSelectedContactID((currentUserId == contactData[0].senderID) ? contactData[0].recvID : contactData[0].senderID));
    }
  }, [contactData]);

  const GetMessageData = async () => {
    await dispatch(ContactGetAllMessage({ id: currentUserId }))
  }

  const GetAllUserData = async () => {
    await dispatch(ContactGetAllUserData());
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
        <Select
          key={resetSelect}
          className="chat-search-bar"
          showSearch
          autoClearSearchValue
          placeholder="Tìm kiếm trong trò truyện"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(newSelectContactID) => {
            dispatch(updateSelectedContactID(newSelectContactID));
            console.log(allContactData, selectedContactID);
            setResetSelect(resetSelect == 0 ? 1 : 0);
            inputRef.current.focus();
          }}
          suffixIcon={<SearchOutlined />}
        >
          {allContactData.map((data) => (
              <Option key={data.uid} value={data.uid} label={data.name}>
                  <div className='chat-search-bar-option'>
                      {data.avatar !== '' ? (
                        <Avatar src={data.avatar} />
                      ) : (
                        <Avatar>{data.name[0].toUpperCase()}</Avatar>
                      )}
                      <div>{data.name}</div>
                  </div>
              </Option>
          ))}

        </Select>
        <div className="users-contact-group">
          {contactData.map(data => (
            <ContactItem recvID={(currentUserId == data.senderID) ? data.recvID : data.senderID} content={data.lastestMsg} sendTime={data.sendTime} name={allContactData.find(contact => contact.uid == data.recvID)?.name} avatar={allContactData.find(contact => contact.uid == data.recvID)?.avatar}/>
          ))}
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header__user-info">
            {allContactData.find(contact => contact.uid == selectedContactID)?.avatar !== '' ? (
              <Avatar src={allContactData.find(contact => contact.uid == selectedContactID)?.avatar} />
            ) : (
              <Avatar>{allContactData.find(contact => contact.uid == selectedContactID)?.name[0].toUpperCase()}</Avatar>
            )}
            <div className="username">{allContactData.find(contact => contact.uid === selectedContactID)?.name}</div>
          </div>
          <div className="chat-header__control-group">
            <div className="control-item"><BsTelephoneFill className="phone" /></div>
            <div className="control-item"><BsListUl className="more-option"/></div>
          </div>
        </div>
        <div className="chat-content">
          {messages?.filter(msg => [msg.senderID, msg.recvID].sort().join('-') === [currentUserId, selectedContactID].sort().join('-')).map(filteredMsg => (
            <MessageHolder 
              key={filteredMsg.id} // đảm bảo mỗi phần tử có một key duy nhất
              isMyMessage={filteredMsg.senderID === currentUserId} 
              content={filteredMsg.content} 
              sendTime={filteredMsg.sendTime} 
            />
          ))}
        </div>
        <ChatInput ref={inputRef}/>
      </div>

    </div>
  );
};

export default Contact;
