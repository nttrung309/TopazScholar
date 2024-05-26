import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectedContactIDDataSelector } from "../../../redux/contact/contactSelector";
import { updateSelectedContactID } from "../../../redux/contact/contactAction";
import { TimePrettier } from "shared/helper/Time";

const ContactItem = ({recvID, content, sendTime}) => {
    const dispatch = useDispatch();
    const selectedContactID = useSelector(SelectedContactIDDataSelector);

    return(
        <div className={'contact-item ' + ((selectedContactID == recvID) ? 'selected' : '')}
        onClick={() => dispatch(updateSelectedContactID(recvID))}>
            <Avatar size={28} src={require('../../../shared/asset/image/contact/temp_avatar.jpg')} />
            <div className="contact-info">
                    <div className="username">Nguyễn Thành Trung</div>
                    <div className="last-row-wrapper">
                        <div className="last-msg">{content}</div>
                        <div className="last-msg-time">{TimePrettier(sendTime)}</div>
                    </div>
            </div>
        </div>
    );
};

export default ContactItem;