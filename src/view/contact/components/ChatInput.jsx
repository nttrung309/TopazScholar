import { Input } from "antd";
import React from "react";
import { BsCursorFill, BsEmojiSmile, BsPaperclip } from "react-icons/bs";

const { TextArea } = Input;


const ChatInput = () => {
    return(
        <div className="chat-input">
            <div className="left-group">
                <BsEmojiSmile className="chat-input-icon"/>
                <BsPaperclip className="chat-input-icon"/>
                <TextArea
                    className="user-message-input"
                    variant="borderless"
                    placeholder="Nhắn tin"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                />
            </div>
            <BsCursorFill className="send-message-btn"/>
        </div>
    );
};

export default ChatInput;

