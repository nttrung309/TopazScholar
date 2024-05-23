import { Avatar } from "antd";
import React from "react";

const MessageHolder = ({isMyMessage, content, sendTime}) => {
    return(
        <div className={'message-holder ' + (isMyMessage ? 'my-msg' : '')}>
            {!isMyMessage ? <Avatar className="sender-avatar" size={32} src={require('../../../shared/asset/image/contact/temp_avatar.jpg')}/> : null}
            <div className="content">{content}</div>
            <div className="send-time">{sendTime}</div>
        </div>
    );
};

export default MessageHolder;