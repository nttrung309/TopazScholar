import { Avatar } from "antd";
import React from "react";

const ContactItem = ({selected = false}) => {
    return(
        <div className={'contact-item ' + (selected ? 'selected' : '')}>
            <Avatar size={28} src={require('../../../shared/asset/image/contact/temp_avatar.jpg')} />
            <div className="contact-info">
                    <div className="username">Nguyễn Thành Trung</div>
                    <div className="last-row-wrapper">
                        <div className="last-msg">Bạn: Hello</div>
                        <div className="last-msg-time">17h 24/4</div>
                    </div>
            </div>
        </div>
    );
};

export default ContactItem;