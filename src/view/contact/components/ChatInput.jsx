import { Input } from "antd";
import React, { forwardRef, useEffect, useState } from "react";
import { BsCursorFill, BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import io from 'socket.io-client';

import socket from "shared/helper/Socket";
import { useDispatch, useSelector } from "react-redux";
import { AuthUIDSelector } from "../../../redux/auth/userSelector";
import { updateNewMessage } from "../../../redux/contact/contactAction";
import { SelectedContactIDDataSelector } from "../../../redux/contact/contactSelector";

const { TextArea } = Input;

const ChatInput = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState('');
    const [contentType, setContentType] = useState('text');
    const senderID = useSelector(AuthUIDSelector);
    const recvID = useSelector(SelectedContactIDDataSelector);

    useEffect(() => {
        // Lắng nghe sự kiện 'newMessage' từ máy chủ và cập nhật tin nhắn
        socket.on('newMessage', (message) => {
            dispatch(updateNewMessage(message));
        });
    
        // Cleanup để tránh memory leak
        return () => {
          socket.off('newMessage');
        };
    }, []);

    const HandleSendMsg = (event) => {
        if (!event.shiftKey && event.keyCode == 13) {
            event.preventDefault();
            if (userInput.trim() !== '') {
                const msgToSend = {
                    senderID: senderID,
                    recvID: recvID,
                    content: userInput,
                    type: contentType
                }
                socket.emit('sendMessage', msgToSend);
                setUserInput('');
            }
        }
    }

    return(
        <div className="chat-input">
            <div className="left-group">
                <BsEmojiSmile className="chat-input-icon"/>
                <BsPaperclip className="chat-input-icon"/>
                <TextArea
                    ref={ref}
                    className="user-message-input"
                    variant="borderless"
                    placeholder="Nhắn tin"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onKeyDown={HandleSendMsg}
                    onChange={(event) => {setUserInput(event.target.value)}}
                    value={userInput}
                />
            </div>
            <BsCursorFill className="send-message-btn"/>
        </div>
    );
});

export default ChatInput;

